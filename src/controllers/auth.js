const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { General_member} = require('../models');
const { Dev_member} = require('../models');
const { User } = require('../models');
const redisClient = require('../config/redisClient');
const dotenv = require('dotenv');
dotenv.config({path : '../.env'});
//회원가입
exports.join = async (req, res, next) => {
    try {
        const {student_id, email, password} = req.body;
        const generalMember = await General_member.findOne({ where: { student_id }});
        const devMember = !generalMember ? await Dev_member.findOne({ where: { student_id }}) : null;
        if (!generalMember && !devMember){
            return res.status(409).send('퀴푸 회원이 아님');
        }
        const exUser = await User.findOne({where: {student_id}});
        if (exUser){
            return res.status(409).send('이미 회원가입했음')
        }
        let Userdata = null;
        if (generalMember) {
            Userdata = generalMember.toJSON();
        }
        else if (devMember) {
            Userdata = devMember.toJSON();
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            user_name: Userdata.name,
            student_id: Userdata.student_id,
            major: Userdata.major,
            email,
            password: hash,
        })
        return res.status(201).send('회원가입 완료');
    } catch(error) {
        console.error(error);
        next(error);
    }
}
//로그인
exports.login = (req, res, next) => {
    passport.authenticate('local', async (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.status(401).send(`${info.message}`);
        }
        try {
            const payload = { student_id: user.student_id };
            const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: '1h' }); // accessToken 발급
            const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '1d' }); // refreshToken 발급
            const existingToken = await redisClient.get(`refreshToken:${user.student_id}`);
            if (existingToken) {
                await redisClient.del(`refreshToken:${user.student_id}`);
                console.log("기존 Refresh Token 삭제");
            }
            await redisClient.set(`refreshToken:${user.student_id}`, refreshToken);
            console.log("refreshToken 저장");
            return res.status(200).json({
                accessToken,
                refreshToken,
                message: '로그인 성공',
                user: {
                    name: user.user_name,
                    student_id: user.student_id,
                    email: user.email,
                    major: user.major
                }
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    })(req, res, next);
};

//로그아웃
exports.logout = async (req, res, next) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(400).send('Refresh token이 필요합니다.');
    }

    try {
        // Refresh Token 삭제
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
        const student_id = decoded.student_id;

        await redisClient.del(`refreshToken:${student_id}`);
        res.status(200).send('로그아웃 성공');
    } catch (error) {
        console.error(error);
        res.status(400).send('로그아웃 실패');
    }
};


// Refresh Token으로 Access Token 갱신
exports.refreshToken = async (req, res, next) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(400).send('Refresh token이 필요합니다.');
    }

    try {
        // Refresh Token 검증
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
        const student_id = decoded.student_id;

        // 저장된 Refresh Token 확인
        const storedToken = await redisClient.get(`refreshToken:${student_id}`);
        if (storedToken !== refreshToken) {
            return res.status(401).send('유효하지 않은 Refresh Token입니다.');
        }

        // 새로운 Access Token 발급
        const newAccessToken = jwt.sign({ student_id }, process.env.ACCESS_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
        console.error(error);
        res.status(401).send('Refresh Token 검증 실패');
    }
};

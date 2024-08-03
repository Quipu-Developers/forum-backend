const passport = require('passport');
const bcrypt = require('bcrypt');
const { DataTypes} = require("sequelize");
const { General_member} = require('../models');
const { Dev_member} = require('../models');
const { User } = require('../models')
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
    passport.authenticate('local', (authError, user, info) => {
        if (authError) { // 서버 실패
            console.error(authError);
            return next(authError);
        }
        if (!user) { //로직 실패(가입되지 않은 유저 or 비밀번호 틀림)
            return res.status(401).send(`${info.message}`);
        }
        return req.login(user, (loginError) => { //로그인 성공
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.status(200).send('로그인 성공');
        })
    })(req, res, next); //미들웨어 확장
}
//로그아웃
exports.logout = (req, res, next) => {
    req.logout(() => {
        res.status(200).send('로그아웃 성공');
    })
}

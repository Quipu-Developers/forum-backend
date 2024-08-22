const passport = require('passport');
const dotenv = require('dotenv');
dotenv.config({path : '../.env'})
const { Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt');
const { User } = require('../models')

module.exports = () => {
    // JWT 전략 설정
    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.ACCESS_SECRET,
    }, async (jwtPayload, done) => {
        try {
            //console.log(`Received JWT payload: ${JSON.stringify(jwtPayload)}`);
            //토큰 만료 확인
            const currentTime = Math.floor(Date.now() / 1000); // 현재 시간(초 단위)
            if (jwtPayload.exp < currentTime) {
                return done(null, false, { message: 'JWT 토큰이 만료되었습니다.', code: 'TOKEN_EXPIRED' });
            }
            const exUser = await User.findOne({ where: { student_id: jwtPayload.student_id } });
            if (exUser) {
                done(null, exUser);
            } else {
                done(null, false, { message: '유효하지 않은 JWT 토큰입니다.' });
            }
        } catch (error) {
            done(error);
        }
    }));
};
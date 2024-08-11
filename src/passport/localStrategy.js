const passport = require('passport');
const bcrypt = require('bcrypt');
const { Strategy: LocalStrategy } = require('passport-local');
const { User } = require('../models')

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'student_id', // req.body.student_id
        passwordField: 'password', // req.body.password
        passReqToCallback: false,
    }, async (student_id, password, done) => {
        try {
            console.log(`Received student_id: ${student_id}, password: ${password}`);
            const exUser = await User.findOne({ where: { student_id } });
            if (exUser) {
                const result = await bcrypt.compare(password, exUser.password);
                if (result) {
                    done(null, exUser); //사용자 반환
                } else {
                    done(null, false, { message: '비밀번호가 틀림.' });
                }
            } else {
                done(null, false, { message: '가입되지 않은 회원' });
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
}
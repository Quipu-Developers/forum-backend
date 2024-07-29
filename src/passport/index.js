const passport = require("passport");
const local = require("./localStrategy");
const {User} = require("../models/user");

module.exports = () => {
    passport.serializeUser((user, done) => { // user === exUser
        done(null, user.student_id); // user.id만 추출
    });
    passport.deserializeUser((student_id, done) => {
        User.findOne({where : { student_id } }) //req.user
            .then((user) => done(null, user))
            .catch(err => done(err));
    });

    local();
};


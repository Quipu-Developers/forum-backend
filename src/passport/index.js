const passport = require("passport");
const local = require("./localStrategy");
const User = require("../models/user");

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser(() => {
        User.findOne({where : {id} })
            .then((user) => done(null, user))
            .catch(err => done(err));
    });
};


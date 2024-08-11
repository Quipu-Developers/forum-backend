const passport = require("passport");
const jwt = require("./jwtStrategy");
const local = require("./localStrategy");
const {User} = require("../models");

module.exports = () => {
    local();
    jwt();
};

const express = require("express");
const passport = require("passport");
const { isLoggedin, isNotLoggedin } = require("../middlewares");
const { join, login, logout, refreshToken } = require("../controllers/auth");
const router = express.Router();
// POST /auth/join
router.post('/join', isNotLoggedin, join);
// POST /auth/login
router.post('/login', isNotLoggedin, login);
// POST /auth/logout
router.post('/logout', isLoggedin, logout);
// POST /auth/
router.post('/refreshToken', isLoggedin, refreshToken);

module.exports = router;
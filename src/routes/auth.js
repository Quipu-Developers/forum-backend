const express = require("express");
const passport = require("passport");
const { isLoggedin, isNotLoggedin } = require("../middlewears");
const { join, login, logout } = require("../controllers/auth");
const router = express.Router();
// POST /auth/join
router.post('/join', isNotLoggedin, join);
// POST /auth/login
router.post('/login', isNotLoggedin, login);
// GET /auth/logout
router.get('/logout', isLoggedin, logout);

module.exports = router;
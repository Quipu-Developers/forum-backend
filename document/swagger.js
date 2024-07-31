const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const dotenv = require("dotenv");
const passport = require("passport");
const PORT = process.env.PORT || 3001;

dotenv.config({path: '../src/.env'}); //process.env
const { forumSequelize, joinquipuSequelize } = require("../src/models");
const passportConfig = require("../src/passport");
passportConfig({path: '../src.env'});
const authRouter = require('../src/routes/auth');
const app = express();
// Swagger 관련 추가
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false, //개발 시에만 false로(http, https 모두 가능)
    }
}));
app.use(passport.initialize()); // req.user, req.login, req.isAuthenticate, req.logout
app.use(passport.session()); //connect.id라는 이름으로 세션 쿠키가 브라우져로 전송


async function DBConnections() {
    try {
        // forum 스키마에 대한 인증 및 동기화
        await forumSequelize.authenticate();
        console.log("forum 스키마 DB 연결");
        await forumSequelize.sync({});
        console.log("forum 스키마 DB 동기화");

        // joinquipu 스키마에 대한 인증 및 동기화
        await joinquipuSequelize.authenticate();
        console.log("joinquipu 스키마 DB 연결");
        await joinquipuSequelize.sync({});
        console.log("joinquipu 스키마 DB 동기화");

        // 서버 시작
        app.listen(PORT, () => {
            console.log(`swagger: http://localhost:${PORT}/api-docs`);
            console.log('COOKIE_SECRET:', process.env.COOKIE_SECRET);
        });
    } catch (err) {
        console.error("DB 연결 실패:", err);
    }
}

DBConnections();


app.use('/auth', authRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((err, req, res, next) => {
    console.error(err.stack || err);
    res.status(500).json({
        error: {
            message: 'Internet Server Error'
        }
    })
});



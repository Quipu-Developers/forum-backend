const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const dotenv = require("dotenv");
const passport = require("passport");
const redisClient = require("./config/redisClient");
const PORT = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const initialize = require('./initialize');

const freeBoardRoute = require('./routes/freeBoardRoute');
const infoBoardRoute = require('./routes/infoBoardRoute');
const codingBoardRoute = require('./routes/codingBoardRoute');
const infoBoardCommentRoute = require('./routes/infoBoardCommentRoute');
const codingBoardCommentRoute = require('./routes/codingBoardCommentRoute');
const freeBoardCommentRoute = require('./routes/freeBoardCommentRoute');
const boardRoute = require('./routes/boardRoute');

const { swaggerUi, specs } = require('./swagger');

dotenv.config(); //process.env

const { forumSequelize, joinquipuSequelize } = require("./models");
const passportConfig = require("./passport");
passportConfig();
const authRouter = require('./routes/auth');

const cors = require('cors');

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/board', freeBoardRoute);
app.use('/board', infoBoardRoute);
app.use('/board', codingBoardRoute);
app.use('/board', infoBoardCommentRoute);
app.use('/board', codingBoardCommentRoute);
app.use('/board', freeBoardCommentRoute);
app.use('/board', boardRoute);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
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
        await forumSequelize.sync({force: true});
        console.log("forum 스키마 DB 동기화");

        await initialize();

        // joinquipu 스키마에 대한 인증 및 동기화
        await joinquipuSequelize.authenticate();
        console.log("joinquipu 스키마 DB 연결");
        await joinquipuSequelize.sync();
        console.log("joinquipu 스키마 DB 동기화");

        //redis 연결
        await redisClient.connect().catch(console.error);
        await redisClient.select(0);
        console.log("redis 연결, DB index: 0");

        // 서버 시작
        app.listen(PORT, () => {
            console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
        });
    } catch (err) {
        console.error("DB 연결 실패:", err);
    }
}

DBConnections();



app.use('/auth', authRouter);
app.use((err, req, res, next) => {
    console.error(err.stack || err);
    res.status(500).json({
        error: {
            message: 'Internet Server Error'
        }
    })
});



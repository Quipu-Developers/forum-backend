const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 3001;
const bodyParser = require('body-parser');

const freeBoardRoute = require('./routes/freeBoardRoute');
const infoBoardRoute = require('./routes/infoBoardRoute');
const { swaggerUi, specs } = require('./swagger');

dotenv.config(); //process.env
const { forumSequelize, joinquipuSequelize } = require("./models");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/board', freeBoardRoute);
app.use('/board', infoBoardRoute);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


async function DBConnections() {
    try {
        // forum 스키마에 대한 인증 및 동기화
        await forumSequelize.authenticate();
        console.log("forum 스키마 DB 연결");
        await forumSequelize.sync({force:true});
        console.log("forum 스키마 DB 동기화");

        // joinquipu 스키마에 대한 인증 및 동기화
        await joinquipuSequelize.authenticate();
        console.log("joinquipu 스키마 DB 연결");
        await joinquipuSequelize.sync();
        console.log("joinquipu 스키마 DB 동기화");

        // 서버 시작
        app.listen(PORT, () => {
            console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
        });
    } catch (err) {
        console.error("DB 연결 실패:", err);
    }
}

DBConnections();

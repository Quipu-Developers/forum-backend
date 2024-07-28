const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 3001;

dotenv.config(); //process.env
const { sequelize } = require('./models');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser(process.env.COOKIE_SECRET));

sequelize.authenticate()
    .then(() => {
        console.log('DB 연결');
        //return sequelize.sync({ alter: true });
        return sequelize.sync({ });
    })
    .then(() => {
        console.log('DB 동기화');
        app.listen(PORT, () => {
            console.log(`port:${PORT}`)
            //console.log(`swagger: http://localhost:${PORT}/api-docs`);
        });
    })
    .catch(err => {
        console.error('DB 연결 실패:', err);
    });

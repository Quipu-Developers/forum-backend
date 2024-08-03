const Sequelize = require("sequelize");
const fs = require('fs');
const path = require('path');
const env = process.env.NODE_ENV || 'test';
const forumConfig = require(__dirname + "/../config/forumConfig.json")[env];
const joinquipuConfig = require(__dirname + "/../config/joinquipuConfig.json")[env];

const db = {}
const forumSequelize = new Sequelize(
  forumConfig.database,
  forumConfig.username,
  forumConfig.password,
  forumConfig
);
const joinquipuSequelize = new Sequelize(
  joinquipuConfig.database,
  joinquipuConfig.username,
  joinquipuConfig.password,
  joinquipuConfig
);
db.forumSequelize = forumSequelize;
db.joinquipuSequelize = joinquipuSequelize;

const basename = path.basename(__filename);
const General_member = require('./general_member');
const Dev_member = require('./dev_member');

fs
    .readdirSync(__dirname) // 현재 폴더의 모든 파일을 조회
    .filter(file => { // 숨김 파일, index.js, js 확장자가 아닌 파일 필터링
      return (file.indexOf('.') !== 0) && (file !== basename) && (file !== `general_member.js`) && (file !== `dev_member.js`) && (file.slice(-3) === '.js');
    })
    .forEach(file => { // 해당 파일의 모델 불러와서 init
      const model = require(path.join(__dirname, file));
      console.log(file, model.name);
      db[model.name] = model;
      model.initiate(forumSequelize);
    });

db.General_member = General_member;
db.Dev_member = Dev_member;
General_member.initiate(joinquipuSequelize);
Dev_member.initiate(joinquipuSequelize);

Object.keys(db).forEach(modelName => { // associate 호출
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


module.exports = db;


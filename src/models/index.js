const Sequelize = require("sequelize");
const fs = require('fs');
const path = require('path');
const env = process.env.NODE_ENV || 'test';
const forumConfig = require(__dirname + "/config/forumConfig.json")[env];
const joinquipuConfig = require(__dirname + "/config/joinquipuConfig.json")[env];

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

const forumModelsDir = path.join(__dirname, 'forumModels');
const joinquipuModelsDir = path.join(__dirname, 'joinquipuModels');

fs
    .readdirSync(forumModelsDir)
    .filter(file => { // 숨김 파일, index.js, js 확장자가 아닌 파일 필터링
        return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
    })
    .forEach(file => { // 해당 파일의 모델 불러와서 init
        const model = require(path.join(forumModelsDir, file));
        console.log(file, model.name);
        db[model.name] = model;
        model.initiate(forumSequelize);
    });
fs
    .readdirSync(joinquipuModelsDir)
    .filter(file => { // 숨김 파일, index.js, js 확장자가 아닌 파일 필터링
        return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
    })
    .forEach(file => { // 해당 파일의 모델 불러와서 init
        const model = require(path.join(joinquipuModelsDir, file));
        console.log(file, model.name);
        db[model.name] = model;
        model.initiate(joinquipuSequelize);
    });

Object.keys(db).forEach(modelName => { // associate 호출
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


module.exports = db;


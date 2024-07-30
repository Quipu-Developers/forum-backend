const { Sequelize, DataTypes } = require("sequelize");
const forumConfig = require(__dirname + "/../config/forumConfig.json")[
  "development"
];
const joinquipuConfig = require(__dirname + "/../config/joinquipuConfig.json")[
  "development"
];

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

const User = require("./user");
const Post = require("./post");
const Comment = require("./comment");
const General_member = require("./general_member");
const Dev_member = require("./dev_member");

User.initiate(forumSequelize);
Post.initiate(forumSequelize);
Comment.initiate(forumSequelize);
General_member.initiate(joinquipuSequelize);
Dev_member.initiate(joinquipuSequelize);

const models = {
  User,
  Post,
  Comment,
  General_member,
  Dev_member,
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = {
  forumSequelize,
  joinquipuSequelize,
  Sequelize,
  ...models,
};

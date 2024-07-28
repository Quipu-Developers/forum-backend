const { Sequelize, DataTypes } = require("sequelize");

const config = require(__dirname + "/../config/config.json")["development"];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const User = require("./user")(sequelize, DataTypes);
const Post = require("./post")(sequelize, DataTypes);
const Comment = require("./comment")(sequelize, DataTypes);

const models = {
  User,
  Post,
  Comment,
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;

const { DataTypes } = require("sequelize");
const Sequelize = require('sequelize');

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        user_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        student_id: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
        },
        major: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: true,
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(models) {
    User.hasMany(models.Post, {
      foreignKey: "id",
      sourceKey: "id",
    });
    User.hasMany(models.Comment, {
      foreignKey: "id",
      sourceKey: "id",
    });
    /*
    User.belongsTo(models.General_member, {
      foreignKey: "student_id",
      targetKey: "student_id",
    });
    User.belongsTo(models.Dev_member, {
      foreignKey: "student_id",
      targetKey: "student_id",
    });
     */
  }
}

module.exports = User;

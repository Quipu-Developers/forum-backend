const { DataTypes } = require("sequelize");
const Sequelize = require('sequelize');

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(
      {
        user_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
            allowNull: false,
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
          underscored: true,
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
      db.User.hasMany(db.FreeBoard, { foreignKey: 'user_id', as: 'freeBoards' });
      db.User.hasMany(db.FreeBoardComment, { foreignKey: 'user_id', as: 'freeBoardComments' });
      db.User.hasMany(db.CodingBoard, { foreignKey: 'user_id', as: 'codingBoards' });
      db.User.hasMany(db.CodingBoardComment, { foreignKey: 'user_id', as: 'codingBoardComments' });
      db.User.hasMany(db.InfoBoard, { foreignKey: 'user_id', as: 'infoBoards' });
      db.User.hasMany(db.InfoBoardComment, { foreignKey: 'user_id', as: 'infoBoardComments' });
      db.User.hasMany(db.Gallery);

  }
}

module.exports = User;

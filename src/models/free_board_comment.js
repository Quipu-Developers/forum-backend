const { DataTypes } = require("sequelize");
const Sequelize = require('sequelize');

class Free_board_comment extends Sequelize.Model {
  static initiate(sequelize) {
    Free_board_comment.init(
      {
        comment_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
            allowNull: false,
        },
        parent_comment_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        user_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        comment: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Free_board_comment",
        tableName: "free_board_comments",
          underscored: true,
        timestamps: true,
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Free_board_comment.belongsTo(db.User);
    db.Free_board_comment.belongsTo(db.Free_board);
  }
}

module.exports = Free_board_comment;

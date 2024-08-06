const { DataTypes } = require("sequelize");
const Sequelize = require('sequelize');

class Coding_board_comment extends Sequelize.Model {
    static initiate(sequelize) {
        Coding_board_comment.init(
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
                post_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                user_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                }
            },
            {
                sequelize,
                modelName: "Coding_board_comment",
                tableName: "coding_board_comments",
                underscored: true,
                timestamps: true,
                paranoid: true,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }

    static associate(db) {
        db.Coding_board_comment.belongsTo(db.User, {foreignKey : 'user_id', targetKey : 'user_id'});
        db.Coding_board_comment.belongsTo(db.Coding_board, {foreignKey : 'post_id', targetKey : 'post_id'});
    }
}

module.exports = Coding_board_comment;

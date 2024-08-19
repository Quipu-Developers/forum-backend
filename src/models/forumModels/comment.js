const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');

class Comment extends Sequelize.Model {
    static initiate(sequelize) {
        Comment.init(
            {
                comment_id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                },
                post_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                user_id: {
                    type: DataTypes.INTEGER,
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
                modelName: "Comment",
                tableName: "comments",
                underscored: true,
                timestamps: true,
                paranoid: true,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }
}

module.exports = Comment;

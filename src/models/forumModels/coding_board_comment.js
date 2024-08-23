const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');

class CodingBoardComment extends Sequelize.Model {
    static initiate(sequelize) {
        CodingBoardComment.init(
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
                modelName: "CodingBoardComment",
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
        db.CodingBoardComment.belongsTo(db.User, {foreignKey : 'user_id', targetKey : 'user_id'});
        db.CodingBoardComment.belongsTo(db.CodingBoard, {foreignKey : 'post_id', targetKey : 'post_id'});
    }
}

module.exports = CodingBoardComment;

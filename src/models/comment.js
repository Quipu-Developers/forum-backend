const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Comment = sequelize.define(
        "Comment",
        {
            comment_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            parent_comment_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            post_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Posts", // 참조할 모델 이름
                    key: "post_id",
                },
                onDelete: "CASCADE", // 게시글 삭제 시 관련 댓글도 삭제
            },
            board_type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            user_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Users",
                    key: "user_id",
                },
            },
            comment: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            post_time: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            edit_time: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            file_name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            file_size: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            file_type: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            file_url: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            tableName: "Comments",
            timestamps: true,
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci",
        }
    );

    Comment.associate = function (models) {
        Comment.belongsTo(models.Post, {
            foreignKey: "post_id",
            targetKey: "post_id",
        });
        Comment.belongsTo(models.User, {
            foreignKey: "user_id",
            targetKey: "user_id",
        });
    };

    return Comment;
};

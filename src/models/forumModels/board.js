const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');

class Board extends Sequelize.Model {
    static initiate(sequelize) {
        Board.init(
            {
                post_id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                },
                user_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                user_name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                title: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                content: {
                    type: DataTypes.JSON,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: "Post",
                tableName: "posts",
                underscored: true,
                timestamps: true,
                paranoid: true,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }

    static associate(db) {
        db.Board.belongsTo(db.User, { foreignKey: 'user_id', as: 'User' });
        db.Board.hasMany(db.Comment, { foreignKey: 'post_id', as: 'Comments' });
    }
}

module.exports = Post;

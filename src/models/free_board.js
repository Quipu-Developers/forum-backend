const { DataTypes } = require("sequelize");
const Sequelize = require('sequelize');

class Free_board extends Sequelize.Model {
    static initiate(sequelize) {
        Free_board.init(
            {
                post_id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                },
                user_id: {  // user_id 필드를 추가
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
                modelName: "Free_board",
                tableName: "free_boards",
                underscored: true,
                timestamps: true,
                paranoid: true,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }

    static associate(db) {
        db.Free_board.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'user_id' });
        db.Free_board.hasMany(db.Free_board_comment, { foreignKey: 'post_id', sourceKey: 'post_id' });
    }
}

module.exports = Free_board;

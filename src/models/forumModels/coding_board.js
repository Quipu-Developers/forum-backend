const { DataTypes } = require("sequelize");
const Sequelize = require('sequelize');

class Coding_board extends Sequelize.Model {
    static initiate(sequelize) {
        Coding_board.init(
            {
                post_id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
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
                modelName: "Coding_board",
                tableName: "coding_boards",
                underscored: true,
                timestamps: true,
                paranoid: true,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }

    static associate(db) {
        db.Coding_board.belongsTo(db.User);
        db.Coding_board.hasMany(db.Coding_board_comment);
    }
}

module.exports = Coding_board;

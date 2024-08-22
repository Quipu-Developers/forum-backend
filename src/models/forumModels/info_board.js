const { DataTypes } = require("sequelize");
const Sequelize = require('sequelize');

class Info_board extends Sequelize.Model {
    static initiate(sequelize) {
        Info_board.init(
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
                modelName: "Info_board",
                tableName: "info_boards",
                underscored: true,
                timestamps: true,
                paranoid: true,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }

    static associate(db) {
        db.Info_board.belongsTo(db.User);
        db.Info_board.hasMany(db.Info_board_comment);
        db.Info_board.hasMany(db.Info_board_file);
    }
}

module.exports = Info_board;

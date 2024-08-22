const { DataTypes } = require("sequelize");
const Sequelize = require('sequelize');

class Info_board_file extends Sequelize.Model {
    static initiate(sequelize) {
        Info_board_file.init(
            {
                file_id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                },
                file_name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                file_path: {
                    type: DataTypes.STRING,
                    allowNull: false,
                }
            },
            {
                sequelize,
                modelName: "Info_board_file",
                tableName: "info_board_files",
                underscored: true,
                timestamps: true,
                paranoid: true,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }

    static associate(db) {
        db.Info_board_file.belongsTo(db.Info_board);
    }
}

module.exports = Info_board_file;

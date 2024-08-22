const { DataTypes } = require("sequelize");
const Sequelize = require('sequelize');

class FreeBoardFile extends Sequelize.Model {
    static initiate(sequelize) {
        FreeBoardFile.init(
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
                modelName: "Free_board_file",
                tableName: "free_board_files",
                underscored: true,
                timestamps: true,
                paranoid: true,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }

    static associate(db) {
        db.FreeBoardFile.belongsTo(db.FreeBoard);
    }
}

module.exports = FreeBoardFile;

const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');

class CodingBoard extends Sequelize.Model {
    static initiate(sequelize) {
            CodingBoard.init(
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
                    modelName: 'CodingBoard',
                    tableName: 'coding_boards',
                    underscored: true,
                    timestamps: true,
                    paranoid: true,
                    charset: 'utf8mb4',
                    collate: 'utf8mb4_general_ci',
                }
            );
        }
    static associate(db) {
        db.CodingBoard.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'user_id' });
        db.CodingBoard.hasMany(db.CodingBoardComment, { foreignKey: 'post_id', sourceKey: 'post_id' });
        db.CodingBoard.hasMany(db.CodingBoardFile, {foreignKey : 'post_id', sourceKey: 'post_id' });
    }
}

module.exports = CodingBoard;

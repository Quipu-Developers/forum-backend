const CodingBoardFile = require('./coding_board_file.js');

class InfoBoardFile extends CodingBoardFile {
    static initiate(sequelize) {
        super.initiate(sequelize);
        InfoBoardFile.init(
            {
                // 부모 클래스(Board)의 필드를 수동으로 정의
                ...CodingBoardFile.rawAttributes,
                // 추가적인 필드가 있다면 여기서 추가 allowNull: false,
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
        db.InfoBoardFile.belongsTo(db.InfoBoard, {foreignKey : 'post_id', targetKey : 'post_id'});
    }
}

module.exports = InfoBoardFile;

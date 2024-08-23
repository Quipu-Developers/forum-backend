const CodingBoard = require('./coding_board');

class InfoBoard extends CodingBoard {
    static initiate(sequelize) {
        super.initiate(sequelize, {createTable: false});
        InfoBoard.init(
            {
                // 부모 클래스(Board)의 필드를 수동으로 정의
                ...CodingBoard.rawAttributes,
                // 추가적인 필드가 있다면 여기서 추가
            },
            {
                sequelize,
                modelName: 'InfoBoard',
                tableName: 'info_boards',
            }
        );
    }

    static associate(db) {
        db.InfoBoard.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'user_id' });
        db.InfoBoard.hasMany(db.InfoBoardComment, { foreignKey: 'post_id', sourceKey: 'post_id' });
        db.InfoBoard.hasMany(db.InfoBoardFile, {foreignKey : 'post_id', sourceKey: 'post_id' });
    }
}

module.exports = InfoBoard;

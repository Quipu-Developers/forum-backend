const CodingBoard = require('./coding_board');

class FreeBoard extends CodingBoard {
    static initiate(sequelize) {
        super.initiate(sequelize, {createTable: false});
        FreeBoard.init(
            {
                // 부모 클래스(Board)의 필드를 수동으로 정의
                ...CodingBoard.rawAttributes,
                // 추가적인 필드가 있다면 여기서 추가
            },
            {
                sequelize,
                modelName: 'FreeBoard',
                tableName: 'free_boards',
            }
        );
    }

    static associate(db) {
        db.FreeBoard.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'user_id' });
        db.FreeBoard.hasMany(db.FreeBoardComment, { foreignKey: 'post_id', sourceKey: 'post_id' });
        db.FreeBoard.hasMany(db.FreeBoardFile, {foreignKey : 'post_id', sourceKey: 'post_id' });
    }
}

module.exports = FreeBoard;

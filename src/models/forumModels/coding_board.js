const Board = require('./board');

class CodingBoard extends Board {
    static initiate(sequelize) {
        CodingBoard.init(
            {
                // 부모 클래스(Board)의 필드를 수동으로 정의
                ...Board.rawAttributes,
                // 추가적인 필드가 있다면 여기서 추가
            },
            {
                sequelize,
                modelName: 'CodingBoard',
                tableName: 'coding_boards',
            }
        );
    }

    static associate(db) {
        db.CodingBoard.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'user_id' });
        db.CodingBoard.hasMany(db.CodingBoardComment, { foreignKey: 'post_id', sourceKey: 'post_id' });
        db.CodingBoard.hasMany(db.Coding_board_file);
    }
}

module.exports = CodingBoard;

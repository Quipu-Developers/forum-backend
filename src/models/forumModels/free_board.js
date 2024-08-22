const Board = require('./board');

class FreeBoard extends Board {
    static initiate(sequelize) {
        super.initiate(sequelize);
        FreeBoard.init(
            {
                // 부모 클래스(Board)의 필드를 수동으로 정의
                ...Board.rawAttributes,
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
        db.Free_board.hasMany(db.Free_board_file);
    }
}

module.exports = FreeBoard;

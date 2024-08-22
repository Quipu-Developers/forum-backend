const Board = require('./board');

class InfoBoard extends Board {
    static initiate(sequelize) {
        super.initiate(sequelize);  // 부모 클래스(Post)의 initiate 메서드 호출
        InfoBoard.init(
            {
                // 부모 클래스(Board)의 필드를 수동으로 정의
                ...Board.rawAttributes,
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
        db.FreeBoard.hasMany(db.InfoBoardFile);
    }
}

module.exports = InfoBoard;

const Comment = require('../../../../../../Downloads/comment');

class FreeBoardComment extends Comment {
    static initiate(sequelize) {
        super.initiate(sequelize);
        FreeBoardComment.init(
            {
                // 부모 클래스(Board)의 필드를 수동으로 정의
                ...Comment.rawAttributes,
                // 추가적인 필드가 있다면 여기서 추가
            },
            {
                sequelize,
                modelName: 'FreeBoardComment',
                tableName: 'free_board_comments',
            }
        );
    }

    static associate(db) {
        db.FreeBoardComment.belongsTo(db.User, {foreignKey : 'user_id', targetKey : 'user_id'});
        db.FreeBoardComment.belongsTo(db.FreeBoard, {foreignKey : 'post_id', targetKey : 'post_id'});
    }
}

module.exports = FreeBoardComment;

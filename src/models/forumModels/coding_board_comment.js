const Comment = require('./comment');

class CodingBoardComment extends Comment {
    static initiate(sequelize) {
        super.initiate(sequelize);
        CodingBoardComment.init(
            {
                // 부모 클래스(Board)의 필드를 수동으로 정의
                ...Comment.rawAttributes,
                // 추가적인 필드가 있다면 여기서 추가
            },
            {
                sequelize,
                modelName: 'CodingBoardComment',
                tableName: 'coding_board_comments',
            }
        );
    }

    static associate(db) {
        db.CodingBoardComment.belongsTo(db.User, { foreignKey: 'user_id' , targetKey : 'user_id'});
        db.CodingBoardComment.belongsTo(db.CodingBoard, { foreignKey: 'post_id' ,targetKey : 'post_id'});
        // post_id가 CodingBoardComment 의 필드로 존재하지 않는다는 오류 발생
    }
}

module.exports = CodingBoardComment;

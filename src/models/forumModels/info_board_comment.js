const CodingBoardComment = require('./coding_board_comment');

class InfoBoardComment extends CodingBoardComment {
    static initiate(sequelize) {
        super.initiate(sequelize);
        InfoBoardComment.init(
            {
                // 부모 클래스(Board)의 필드를 수동으로 정의
                ...CodingBoardComment.rawAttributes,
                // 추가적인 필드가 있다면 여기서 추가
            },
            {
                sequelize,
                modelName: 'InfoBoardComment',
                tableName: 'info_board_comments',
            }
        );
    }

    static associate(db) {
        db.InfoBoardComment.belongsTo(db.User, {foreignKey : 'user_id', targetKey : 'user_id'});
        db.InfoBoardComment.belongsTo(db.InfoBoard, {foreignKey : 'post_id', targetKey : 'post_id'});
    }
}

module.exports = InfoBoardComment;

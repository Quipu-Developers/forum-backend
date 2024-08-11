const Comment = require('./comment');

class CodingBoardComment extends Comment {
    static initiate(sequelize) {
        super.initiate(sequelize);
        CodingBoardComment.init(
            {},
            {
                sequelize,
                modelName: 'CodingBoardComment',
                tableName: 'coding_board_comments',
            }
        );
    }
}

module.exports = CodingBoardComment;

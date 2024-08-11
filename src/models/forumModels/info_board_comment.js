const Comment = require('./Comment');

class InfoBoardComment extends Comment {
    static initiate(sequelize) {
        super.initiate(sequelize);
        InfoBoardComment.init(
            {},
            {
                sequelize,
                modelName: 'InfoBoardComment',
                tableName: 'info_board_comments',
            }
        );
    }
}

module.exports = InfoBoardComment;

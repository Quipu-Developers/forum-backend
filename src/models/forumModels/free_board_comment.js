const Comment = require('./Comment');

class FreeBoardComment extends Comment {
    static initiate(sequelize) {
        super.initiate(sequelize);
        FreeBoardComment.init(
            {},
            {
                sequelize,
                modelName: 'FreeBoardComment',
                tableName: 'free_board_comments',
            }
        );
    }
}

module.exports = FreeBoardComment;

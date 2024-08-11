const Post = require('./Post');

class FreeBoard extends Post {
    static initiate(sequelize) {
        super.initiate(sequelize);
        FreeBoard.init(
            {},
            {
                sequelize,
                modelName: 'FreeBoard',
                tableName: 'free_boards',
            }
        );
    }
}

module.exports = FreeBoard;

const Post = require('./Post');

class CodingBoard extends Post {
    static initiate(sequelize) {
        super.initiate(sequelize);
        CodingBoard.init(
            {},
            {
                sequelize,
                modelName: 'CodingBoard',
                tableName: 'coding_boards',
            }
        );
    }
}

module.exports = CodingBoard;

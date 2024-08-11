const Board = require('./board');

class CodingBoard extends Board {
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

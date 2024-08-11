const Board = require('./board');

class FreeBoard extends Board {
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

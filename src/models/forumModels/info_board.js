const Post = require('./Post');

class InfoBoard extends Post {
    static initiate(sequelize) {
        super.initiate(sequelize);  // 부모 클래스(Post)의 initiate 메서드 호출
        InfoBoard.init(
            {},
            {
                sequelize,
                modelName: 'InfoBoard',
                tableName: 'info_boards',
            }
        );
    }
}

module.exports = InfoBoard;

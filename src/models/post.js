class Post extends Sequelize.Model {
  static initiate(sequelize) {
    Post.init(
      {
        post_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        board_type: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        user_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "User",
            key: "id",
          },
          onDelete: "SET NULL",
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        content: {
          type: DataTypes.JSON,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Post",
        tableName: "posts",
        timestamps: true,
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(models) {
    Post.belongsTo(models.User, {
      foreignKey: "id",
      targetKey: "id",
    });
    Post.hasMany(models.Comment, {
      foreignKey: "post_id",
      sourceKey: "post_id",
    });
  }
}

module.exports = Post;

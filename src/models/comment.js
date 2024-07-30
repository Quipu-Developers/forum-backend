class Comment extends Sequelize.Model {
  static initiate(sequelize) {
    Comment.init(
      {
        comment_id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        parent_comment_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        post_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "Post",
            key: "post_id",
          },
          onDelete: "CASCADE",
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
        comment: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Comment",
        tableName: "comments",
        timestamps: true,
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(models) {
    Comment.belongsTo(models.User, {
      foreignKey: "id",
      targetKey: "id",
    });
    Comment.belongsTo(models.Post, {
      foreignKey: "post_id",
      targetKey: "post_id",
    });
  }
}

module.exports = Comment;

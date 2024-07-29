const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Post = sequelize.define(
    "Post",
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
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      post_time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      edit_time: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      file_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      file_size: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      file_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      file_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      content: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      tableName: "Posts",
      timestamps: true,
    }
  );

  Post.associate = function (models) {
    Post.hasMany(models.Comment, {
      foreignKey: "post_id",
      sourceKey: "post_id",
    });
  };

  return Post;
};

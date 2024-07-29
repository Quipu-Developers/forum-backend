module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      student_id: {
          type: DataTypes.STRING,
          uniqueKey: true,
          allowNull: false,
      },
      major: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "Users",
      timestamps: true,
    }
  );

  User.associate = function (models) {
    // Define associations here
  };

  return User;
};

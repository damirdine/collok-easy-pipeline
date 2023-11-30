export default (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      createdAt: {
        field: "created_at",
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.fn("NOW"),
        allowNull: false,
      },
      updatedAt: {
        field: "updated_at",
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.fn("NOW"),
        allowNull: false,
      },
      first_name: { type: DataTypes.STRING, allowNull: false },
      last_name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      password: { type: DataTypes.STRING },
      birth_day: DataTypes.DATE,
      phone: { type: Sequelize.STRING },
      pseudo: { type: DataTypes.STRING },
      gender: { type: DataTypes.STRING },
      avatar: { type: DataTypes.STRING },
    },
    {
      tableName: "user",
    }
  );
  return User;
};

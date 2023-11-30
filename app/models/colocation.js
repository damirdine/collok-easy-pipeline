// models/colocation.js
export default (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;
  const Colocation = sequelize.define(
    "Colocation",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
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
    },
    {
      tableName: "colocation",
    }
  );

  Colocation.associate = (models) => {
    Colocation.hasMany(models.User, { as: "users" });
  };

  return Colocation;
};

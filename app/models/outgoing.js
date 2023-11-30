import user from "./user";

export default (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;
  const Outgoing = sequelize.define("outgoing", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn("NOW"),
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn("NOW"),
      allowNull: false,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true },
    deadline: { type: DataTypes.DATE, allowNull: true },
    final_expense: { type: DataTypes.FLOAT, allowNull: false },
  });
  return Outgoing;
};

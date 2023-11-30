export default (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;
  const Table = sequelize.define("task", {
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
    colocation_id: { type: Sequelize.INTEGER },
    user_id: { type: Sequelize.INTEGER },
  });
  return Table;
};

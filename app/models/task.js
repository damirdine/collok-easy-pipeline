export default (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;

  const task = sequelize.define(
    "task",
    {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
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
      estimated_duration: { type: DataTypes.INTEGER },
    },
    {
      tableName: "task",
    }
  );
  task.associate = (models) => {
    task.hasOne(models.objective, {
      foreignKey: "id",
      constraints: false,
    });
  };
  return task;
};

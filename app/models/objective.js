export default (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;
  const objective = sequelize.define(
    "objective",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
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
      users_assigned: { type: DataTypes.STRING, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: true },
      deadline: { type: DataTypes.DATE, allowNull: true },
    },
    {
      tableName: "objective",
    }
  );

  objective.associate = (models) => {
    objective.belongsTo(models.colocation, { foreignKey: "colocation_id" });
    objective.belongsTo(models.user, { foreignKey: "created_by" });
    
    objective.hasOne(models.task, {
      foreignKey: "objective_id",
      constraints: false,
      as: "task",
    });
    objective.hasOne(models.outgoing, {
      foreignKey: "objective_id",
      constraints: false,
      as: "outgoing",
    });
  };
  return objective;
};

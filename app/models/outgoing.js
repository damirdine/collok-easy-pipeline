//models/outgoing.js
export default (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;
  const outgoing = sequelize.define(
    "outgoing",
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
      final_expense: { type: DataTypes.FLOAT, allowNull: false },
    },
    {
      tableName: "outgoing",
    }
  );

  // Todo l'association
  outgoing.associate = (models) => {
    outgoing.hasOne(models.objective, {
      foreignKey: "id",
      constraints: false,
    });
  };

  return outgoing;
};

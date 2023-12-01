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
      birthday: { type : DataTypes.DATE},
      phone: { type: Sequelize.STRING },
      pseudo: { type: DataTypes.STRING },
      gender: { type: DataTypes.STRING },
      avatar: { type: DataTypes.STRING },
      colocation_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "Colocation",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: true,
      },
    },
    {
      tableName: "user",
    }
  );
  User.associate = (models) => {
    User.belongsTo(models.Colocation, {
      foreignKey: "colocation_id",
      as: "colocation",
    });
  };

  return User;
};

export default (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;
  const user = sequelize.define(
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
      firstname: { type: DataTypes.STRING, allowNull: false },
      lastname: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      password: { type: DataTypes.STRING },
      birthday: { type: DataTypes.DATE },
      phone: { type: Sequelize.STRING },
      pseudo: { type: DataTypes.STRING },
      gender: { type: DataTypes.STRING },
      avatar: { type: DataTypes.STRING },
    },
    {
      tableName: "user",
    }
  );
  user.associate = (models) => {
    user.belongsToMany(models.colocation, { through: "user_colocation" });
    user.hasOne(models.colocation, {
      foreignKey: "admin_user_id",
      as: "admin_user",
    });
  };

  return user;
};

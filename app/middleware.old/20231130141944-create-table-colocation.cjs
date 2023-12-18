"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("colocation", {
      id: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
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
      name: { type: Sequelize.DataTypes.STRING, allowNull: false },
    });

    // Ajouter une colonne "colocation_id" à la table d'objectifs
    await queryInterface.addColumn("objective", "colocation_id", {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "colocation",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Supprimer la colonne "colocation_id" de la table d'objectifs
    await queryInterface.removeColumn("objective", "colocation_id");

    await queryInterface.dropTable("colocation");
  },
};

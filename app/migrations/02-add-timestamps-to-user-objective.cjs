"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "user_objective", // nom de la table
      "createdAt", // nom de la nouvelle colonne
      {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"), // Utilise la fonction NOW de SQL pour définir la valeur par défaut
      }
    );
    await queryInterface.addColumn("user_objective", "updatedAt", {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn("NOW"),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("user_objective", "createdAt");
    await queryInterface.removeColumn("user_objective", "updatedAt");
  },
};

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("outgoing", {
      final_expense: { type: Sequelize.FLOAT, allowNull: false },
      objective_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "objective",
          key: "id",
        },
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("outgoing");
  },
};

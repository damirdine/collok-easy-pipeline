"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("task", {
      estimated_duration: { type: Sequelize.INTEGER },
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
    return queryInterface.dropTable("task");
  },
};

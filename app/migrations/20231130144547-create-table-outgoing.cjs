"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("outgoing", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.fn("NOW"),
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.fn("NOW"),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: { type: Sequelize.STRING, allowNull: true },
      deadline: { type: Sequelize.STRING, allowNull: true },
      final_expense: { type: Sequelize.FLOAT, allowNull: false },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("outgoing");
  },
};

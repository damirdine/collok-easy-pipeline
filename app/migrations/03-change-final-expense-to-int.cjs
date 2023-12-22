'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('outgoing', 'final_expense', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('outgoing', 'final_expense', {
      type: Sequelize.FLOAT,
      allowNull: false
    });
  }
};

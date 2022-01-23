'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Operations', 'date', {
      type: Sequelize.DATEONLY
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('Operations', 'date', {
      type: Sequelize.DATE
    });
  }
};

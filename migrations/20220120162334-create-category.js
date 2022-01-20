'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Categories', {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      }
    });
    await queryInterface.addColumn('Operations', 'categoryName', {
      type: Sequelize.STRING,
      allowNull: true,
          references: {
              model: 'Categories',
              key: 'name'
          },
          onDelete: 'RESTRICT', // Prevent a category from being deleted if an operations references it
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Operations', 'categoryName');
    await queryInterface.dropTable('Categories');
  }
};

'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Budgets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
        amount: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      user: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'User',
              key: 'id',
              as: 'userId'
          },
          onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Budgets');
  }
};

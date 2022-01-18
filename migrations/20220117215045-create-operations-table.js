'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Operations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      concept: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM(),
        values: ['IN', 'OUT']
      },
      userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'Users',
              key: 'id'
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
    await queryInterface.dropTable('Operations');
  }
};

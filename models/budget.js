'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Budget extends Model {
    
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: { name: 'userId', allowNull: false },
        onDelete: 'CASCADE',
      });
    }

  }
 
  Budget.init({
    amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Budget',
  });

  return Budget;
};
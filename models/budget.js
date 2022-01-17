'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Budget extends Model {}
 
  Budget.init({
    amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Budget',
  });
  
  Budget.belongsTo(models.User, {
    foreignKey: { name: 'userId', allowNull: false },
    onDelete: 'CASCADE',
  });

  return Budget;
};
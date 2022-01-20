'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Operation extends Model {
    
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: { 
          name: 'userId', 
          allowNull: false,
        },
        onDelete: 'CASCADE',
      });
      this.belongsTo(models.Category, {
        foreignKey: { 
          name: 'categoryName', 
          allowNull: true,
        },
        onDelete: 'RESTRICT',
      });
    }

  }
 
  Operation.init({
    concept: {
      type: DataTypes.STRING
    },
    amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM(),
      values: ['IN', 'OUT']
    },
    date: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Operation',
  });

  return Operation;
};
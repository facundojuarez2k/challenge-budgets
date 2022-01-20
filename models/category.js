'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    
    static associate(models) {}

  }
 
  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
  }, {
    sequelize,
    modelName: 'Category',
    timestamps: false,
  });

  return Category;
};
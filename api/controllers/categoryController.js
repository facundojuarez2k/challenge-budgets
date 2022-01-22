'use strict';

const { Category } = require('../models');
const { responseCodes } = require('../config/constants');
const { UniqueConstraintError } = require('sequelize');

exports.index = async function(req, res, next) {
    const categories = await Category.findAll();
    return res.json(categories);
};

exports.create = async function(req, res, next) {
    try {
        const newCategory = await Category.create({
            name: req.body.name
        });
        
        return res.status(201).json(newCategory);

    } catch(err) {

        if(err instanceof UniqueConstraintError){   // Duplicated category name
            return res
                    .status(responseCodes.alreadyExists.status)
                    .json(responseCodes.alreadyExists.details);
        } else {
            console.log(err);
            return res.status(500).send('Could not create a new category');
        }
    }
}
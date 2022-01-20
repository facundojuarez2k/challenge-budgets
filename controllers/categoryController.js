'use strict';

const { Category } = require('../models');

exports.index = async function(req, res, next) {
    const categories = await Category.findAll();
    res.json(categories);
};
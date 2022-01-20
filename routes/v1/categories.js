'use strict';

const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/categoryController');
const { createCategoryValidator } = require('../../validators/category');

router.route('/').get(categoryController.index);
router.route('/').post(createCategoryValidator, categoryController.create);

module.exports = router;
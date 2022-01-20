'use strict';

const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/categoryController');
const { categoryValidator } = require('../../validators/category');

router.route('/').get(categoryController.index);

module.exports = router;
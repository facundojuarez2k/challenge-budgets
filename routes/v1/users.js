'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const { createUserValidator } = require('../../validators/user');

router.route('/').post(createUserValidator, userController.create);

module.exports = router;

'use strict';

const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');
const { authenticateValidator } = require('../../validators/auth');

router.route('/token').post(authenticateValidator, authController.authenticateUser);

module.exports = router;

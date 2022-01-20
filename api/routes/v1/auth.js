'use strict';

const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');
const { authenticateValidator } = require('../../validators/auth');
const { verifyToken } = require('../../middleware/auth');

router.route('/token').post(authenticateValidator, authController.authenticateUser);
router.route('/token/test').get(verifyToken, authController.testToken);

module.exports = router;

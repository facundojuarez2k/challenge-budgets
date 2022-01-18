const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const { authenticateValidator, createUserValidator } = require('../../validators/user');

router.route('/').post(createUserValidator, userController.create);
router.route('/authenticate').post(authenticateValidator, userController.authenticateUser);

module.exports = router;

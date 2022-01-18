const express = require('express');
const router = express.Router();
const operationController = require('../../controllers/operationController');
const { createOperationValidator } = require('../../validators/operation');

router.route('/').get(operationController.index);
router.route('/').post(createOperationValidator, operationController.create);

module.exports = router;
const express = require('express');
const router = express.Router();
const operationController = require('../../controllers/operationController');
const { createOperationValidator, updateOperationValidator } = require('../../validators/operation');

router.route('/').get(operationController.index);
router.route('/').post(createOperationValidator, operationController.create);
router.route('/:id').get(operationController.get);
router.route('/:id').put(updateOperationValidator, operationController.update);

module.exports = router;
const express = require('express');
const router = express.Router();
const operationController = require('../../controllers/operationController');
const { createOperationValidator, updateOperationValidator } = require('../../validators/operation');
const { verifyToken } = require('../../middleware/auth');

router.route('/').get(verifyToken, operationController.index);
router.route('/').post(verifyToken, createOperationValidator, operationController.create);
router.route('/:id').get(verifyToken, operationController.get);
router.route('/:id').put(verifyToken, updateOperationValidator, operationController.update);
router.route('/:id').delete(verifyToken, operationController.delete);

module.exports = router;
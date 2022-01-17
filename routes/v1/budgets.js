const express = require('express');
const router = express.Router();
const budgetController = require('../../controllers/budgetController');
const { createBudgetValidator } = require('../../validators/budget');

router.route('/').get(budgetController.index);
router.route('/').post(createBudgetValidator, budgetController.create);

module.exports = router;
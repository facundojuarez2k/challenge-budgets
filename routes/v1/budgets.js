const express = require('express');
const router = express.Router();
const budgetController = require('../../controllers/budgetController');

router.get('/', budgetController.index);

module.exports = router;
const express = require('express');
const router = express.Router();
const userRoutes = require('./users');
const budgetsRoutes = require('./budgets');

router.use('/users', userRoutes);
router.use('/budgets', budgetsRoutes);

module.exports = router;

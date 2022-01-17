const express = require('express');
const router = express.Router();

const userRoutes = require('./users');
const budgetsRoutes = require('./budgets');

router.get('/', function(req, res, next) {
  res.json({
    'test': 1,
  });
});

router.use('/users', userRoutes);
router.use('/budgets', budgetsRoutes);

module.exports = router;

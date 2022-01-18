const express = require('express');
const router = express.Router();
const userRoutes = require('./users');
const operationRoutes = require('./operations');

router.use('/users', userRoutes);
router.use('/operations', operationRoutes);

module.exports = router;

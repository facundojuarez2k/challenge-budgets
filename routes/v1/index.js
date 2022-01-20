'use strict';

const express = require('express');
const router = express.Router();
const userRoutes = require('./users');
const authRoutes = require('./auth');
const operationRoutes = require('./operations');

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/operations', operationRoutes);

module.exports = router;

'use strict';

const express = require('express');
const router = express.Router();
const userRoutes = require('./users');
const authRoutes = require('./auth');
const operationRoutes = require('./operations');
const categoryRoutes = require('./categories');
const { verifyToken } = require('../../middleware/auth');

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/operations', verifyToken, operationRoutes);
router.use('/categories', verifyToken, categoryRoutes);

module.exports = router;

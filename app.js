require('dotenv').config()
const express = require('express');
const path = require('path');
const logger = require('morgan');
const sequelize = require('./models');
const apiv1 = require('./routes/v1');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/v1', apiv1);

module.exports = app;

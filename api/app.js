require('dotenv').config()
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const sequelize = require('./models');
const apiV1Router = require('./routes/v1');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/v1', apiV1Router);

module.exports = app;

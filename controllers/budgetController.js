const { Budget } = require('../models');
const { ValidationError } = require('sequelize');

exports.index = async function(req, res, next) {
    try {
        const budgets = await Budget.findAll();
        res.json(budgets);
    } catch(err) {
        res.status(500).send();
    }
};

exports.create = async function(req, res, next) {
    try {
        const {concept, amount, type } = req.body;
        const newBudget = await Budget.create({concept, amount, type});
        res.status(201).json(budget);
    } catch(err) {
        console.log(err);
    }
}
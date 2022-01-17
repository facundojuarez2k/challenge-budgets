const { Budget } = require('../models');

exports.index = function(req, res, next) {
    Budget.findAll({})
        .then(budgets => {
            res.json(budgets);
        });
};
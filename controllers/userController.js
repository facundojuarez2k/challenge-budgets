const { User } = require('../models');

exports.index = function(req, res, next) {
    User.findAll({attributes: {exclude: ['password']}})
        .then(users => {
            res.json(users);
        });
};
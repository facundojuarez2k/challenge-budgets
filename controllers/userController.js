const { User } = require('../models');

exports.index = function(req, res, next) {
    User.findAll().then(users => {
        console.log(users);
    });
    res.send('NOT IMPLEMENTED');
};
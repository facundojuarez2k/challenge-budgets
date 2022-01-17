const { User } = require('../models');

exports.index = function(req, res, next) {
    let users = [];

    User.findAll().then(fetchedUsers => {
        users = fetchedUsers;
    });

    res.json(users);
};
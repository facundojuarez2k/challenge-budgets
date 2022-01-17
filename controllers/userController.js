const { User } = require('../models');

exports.index = function(req, res, next) {
    User.findAll({attributes: {exclude: ['password']}})
        .then(fetchedUsers => {
            fetchedUsers.
            users = fetchedUsers;

            res.json(fetchedUsers);
        });
};
const jwt = require("jsonwebtoken");
const { User } = require('../models');

exports.verifyToken = function (req, res, next) {
    let token;

    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
        token = req.headers.authorization.split(' ')[1];
    else if (req.query && req.query.token)
        token = req.query.token;
    
    if (!token) {
        return res.status(403).send("Bearer token required");
    }
  
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);

        const user = User.findByPk(decoded.userId);

        if(!user) {
            return res.status(404).send("Invalid user");
        }

        res.locals.user = user;

    } catch (err) {
        return res.status(401).send("Invalid Token");
    }

    next();
};
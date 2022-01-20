const jwt = require("jsonwebtoken");
const { User } = require('../models');
const { responseCodes } = require('../config/constants');

exports.verifyToken = async function (req, res, next) {
    let token;

    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
        token = req.headers.authorization.split(' ')[1];
    else if (req.query && req.query.token)
        token = req.query.token;
    
    if (!token) {
        return res
                .status(responseCodes.invalidToken.status)
                .json(responseCodes.invalidToken.details);
    }
  
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const user = await User.findByPk(decoded.userId);

        if(!user) {
            return res
                    .status(responseCodes.invalidUserId.status)
                    .send(responseCodes.invalidUserId.details);
        }

        res.locals.user = user;

    } catch (err) {
        return res
                .status(responseCodes.invalidToken.status)
                .send(responseCodes.invalidToken.details);
    }

    next();
};
const jwt = require("jsonwebtoken");

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
        console.log(decoded);
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }

    next();
};
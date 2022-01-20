const {check, validationResult} = require('express-validator');

exports.authenticateValidator = [
    check('email')
        .notEmpty()
        .withMessage('Email required')
        .bail(),
    check('password')
        .notEmpty()
        .withMessage('Password required')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({errors: errors.array()});
        next();
    },
];
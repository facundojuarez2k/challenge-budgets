const {check, validationResult} = require('express-validator');

exports.createUserValidator = [
    check('email')
        .trim()
        .notEmpty()
        .withMessage('Email required')
        .bail()
        .isEmail()
        .withMessage('Invalid email format'),
    check('password')
        .notEmpty()
        .withMessage('Password required')
        .bail()
        .isStrongPassword({minLength: 8, minLowercase: 1, minUppercase: 0, minNumbers: 1, minSymbols: 0})
        .withMessage('Password should be at least 8 characters long, contain at least one lowercase character and at least one number'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({errors: errors.array()});
        next();
    },
];
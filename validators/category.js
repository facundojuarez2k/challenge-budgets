'use strict';

const {check, validationResult} = require('express-validator');

exports.createCategoryValidator = [
    check('name')
        .trim()
        .notEmpty()
        .withMessage('Name required')
        .bail()
        .escape()
        .isLength({min: 2, max: 30})
        .withMessage('Name length should be between 2 and 30 characters'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({errors: errors.array()});
        next();
    },
];
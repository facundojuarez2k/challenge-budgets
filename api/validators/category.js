'use strict';

const {check, validationResult} = require('express-validator');
const { responseCodes } = require('../config/constants');

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
            return res
                    .status(responseCodes.validationError.status)
                    .json({
                        ...responseCodes.validationError.details,
                        errors: errors.array()
                    });
        next();
    },
];
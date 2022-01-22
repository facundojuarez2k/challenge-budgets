'use strict';

const {check, validationResult} = require('express-validator');
const { responseCodes } = require('../config/constants');

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
            return res
                    .status(responseCodes.validationError.status)
                    .json({
                        ...responseCodes.validationError.details,
                        errors: errors.array()
                    });
        next();
    },
];
'use strict';

const {check, validationResult} = require('express-validator');
const { responseCodes } = require('../config/constants');

const basicValidator = [
    check('concept')
        .trim()
        .escape()
        .isLength({min:0 , max:60})
        .withMessage('Max length: 60 characters'),
    check('amount')
        .trim()
        .escape()
        .notEmpty()
        .withMessage('Amount field cannot be empty')
        .isDecimal({force_decimal: false, decimal_digits: '1,2'})
        .withMessage('Allowed format: xxxxxx.yy')
        .custom(value => {
            return parseFloat(value) >= 0;
        })
        .withMessage('Negative values are not allowed'),
    check('date')
        .isDate()
        .withMessage('Date should be in the format YYYY/MM/DD or YYYY-MM-DD')
];

exports.createOperationValidator = [
    ...basicValidator,
    check('type')
        .trim()
        .escape()
        .custom(value => {
            const validTypes = ["IN", "OUT"];
            return validTypes.includes(value);
        })
        .withMessage('Valid type values: IN, OUT'),
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

exports.updateOperationValidator = [
    ...basicValidator,
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
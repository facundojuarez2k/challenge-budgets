const {check, validationResult} = require('express-validator');

exports.createOperationValidator = [
    check('concept')
        .trim()
        .escape()
        .isLength({min:0 , max:255})
        .withMessage('Max length: 255'),
    check('amount')
        .trim()
        .escape()
        .notEmpty()
        .withMessage('Amount field cannot be empty')
        .isNumeric()
        .withMessage('Value should be numeric'),
    check('type')
        .trim()
        .escape()
        .custom(value => {
            const validTypes = ["IN", "OUT"];
            return validTypes.includes(value);
        }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({errors: errors.array()});
        next();
    },
]
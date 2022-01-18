const { Operation } = require('../models');
const { ValidationError } = require('sequelize');

/**
 * Returns all Operation records associated with the authenticated user
 */
exports.index = async function(req, res, next) {
    try {
        const user = await res.locals.user;
        const operations = await Operation.findAll(
            {
                where: { userId: user.id },
                attributes: {
                    exclude: ['userId']
                }
            }
        );
        res.json(operations);
    } catch(err) {
        return res.status(500).send();
    }
};

/**
 * Creates a new Operation linked to the authenticated user
 */
exports.create = async function(req, res, next) {
    try {
        const { concept, amount, type, date } = req.body;
        const user = await res.locals.user;
        
        const newOperation = await Operation.create(
            {
                concept, 
                amount, 
                type, 
                date, 
                userId: user.id
            }
        );

        const { userId, ...op } = newOperation.dataValues;

        res.status(201).json(op);

    } catch(err) {
        console.log(err)
        //Log error
    }
}

/**
 *  Retrieves an Operation by its id
 */
exports.get = async function(req, res, next) {
    try {
        const user = await res.locals.user;
        const operation = await Operation.findByPk(req.params.id, {
            attributes: {exclude: ['userId']}
        });
        
        if(operation === null)
            return res.status(404).send("Not found");

        if(operation.userId !== user.id) {
            return res.status(401).send("Access denied");
        }

        res.json(operation);
    } catch(err) {
        console.log(err)
        //Log error
    }
}

/**
 *  Updates an existing Operation given by the id param
 */
exports.update = async function(req, res, next) {
    try {
        const user = await res.locals.user;
        const operation = await Operation.findByPk(req.params.id);
        
        if(operation === null)
            return res.status(404).send("Not found");

        if(operation.userId !== user.id) {
            return res.status(401).send("Access denied");
        }

        const { concept, amount, date } = req.body;

        operation.set({
            concept,
            amount,
            date,
            updatedAt: Date.now()
        });
        operation.changed('updatedAt', true); // Allow modification of updatedAt field
        
        await operation.save();

        res.json(operation);
    } catch(err) {
        console.log(err)
        //Log error
    }
}

/**
 *  Deletes the Operation associated with the id param
 */
exports.delete = async function(req, res, next) {
    try {
        const user = await res.locals.user;
        const operation = await Operation.findByPk(req.params.id);
        
        if(operation === null)
            return res.status(404).send("Not found");

        // Prevent authenticated user from modifying records that belong to another user
        if(operation.userId !== user.id) {
            return res.status(401).send("Access denied");
        }

        await operation.destroy();

        res.status(204).send();
    } catch(err) {
        console.log(err)
        //Log error
    }
}
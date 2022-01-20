'use strict';

const { sequelize, Operation } = require('../models');
const { ValidationError } = require('sequelize');

/**
 * Returns all Operation records associated with the authenticated user
 */
exports.index = async function(req, res, next) {
    try {
        const user = await res.locals.user;
        const limit = req.query.limit;
        const type = req.query.type;
        const queryOptions = {
            where: { userId: user.id },
            attributes: {
                exclude: ['userId']
            },
            order: [['createdAt', 'DESC']]
        }

        // If limit query param is set, limit the number of results
        if(limit && parseInt(limit) > 0) {
            queryOptions.limit = limit;
        }

        // Filter by operation type
        if(type === "IN" || type === "OUT") {
            queryOptions.where.type = type;
        }

        const operations = await Operation.findAll(queryOptions);

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
        console.log(err);
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
        console.log(err);
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
        console.log(err);
        //Log error
    }
}

exports.balance_get = async function(req, res, next) {
    try {
        const user = await res.locals.user;
        
        // Sum column 'amount' for all records associated to the authenticated user
        const operations = await Operation.findAll({
            where: { userId: user.id },
            attributes: [
                'type',
                [sequelize.fn('sum', sequelize.col('amount')), 'total_amount']
            ],
            group: 'type'
        });

        const resData = {
            total: 0,
            in: 0,
            out: 0
        };

        operations.forEach(op => {
            const {type: opType, total_amount: opTotalAmount} = op.dataValues;

            if(opType === "IN") {
                resData.total += opTotalAmount;
                resData.in = opTotalAmount;
            } else if(opType === "OUT") {
                resData.total -= opTotalAmount;
                resData.out = opTotalAmount;
            }
        });

        res.json(resData);

    } catch(err) {
        console.log(err);
        //Log error
    }
}
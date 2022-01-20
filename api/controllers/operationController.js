'use strict';

const { sequelize, Operation, Category } = require('../models');
const { ValidationError } = require('sequelize');

/**
 * Returns all Operation records associated with the authenticated user
 */
exports.index = async function(req, res, next) {
    try {
        const user = res.locals.user;
        const q_limit = req.query.limit;
        const q_type = req.query.type;
        const q_category = req.query.category;
        
        const queryOptions = {
            where: { userId: user.id },
            attributes: {
                exclude: ['userId']
            },
            order: [['createdAt', 'DESC']]
        };

        // If limit query param is set, limit the number of results
        if(q_limit && parseInt(q_limit) > 0) {
            queryOptions.limit = q_limit;
        }

        // Filter by operation type
        if(q_type === "IN" || q_type === "OUT") {
            queryOptions.where.type = q_type;
        }

        // Filter by category
        if(q_category) {
            queryOptions.where.categoryName = q_category
        }

        const operations = await Operation.findAll(queryOptions);

        return res.json(operations);

    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
};

/**
 * Creates a new Operation linked to the authenticated user
 * The new operation can be linked to a category by passing a string in the categoryName field,
 * if the name does not match any category, it will create one.
 * Returns the new operation.
 */
exports.create = async function(req, res, next) {
    try {
        const { concept, amount, type, date, categoryName } = req.body;
        const user = res.locals.user;

        const [category, _] = await Category.findOrCreate({
            where: { name: categoryName },
            defaults: {
              name: categoryName
            }
        });
        
        const newOperation = await Operation.create(
            {
                concept, 
                amount, 
                type, 
                date,
                categoryName: category.name,
                userId: user.id
            }
        );

        const { userId, ...op } = newOperation.dataValues;

        return res.status(201).json(op);

    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
}

/**
 *  Retrieves an Operation by its id
 */
exports.get = async function(req, res, next) {
    try {
        const user = res.locals.user;
        const operation = await Operation.findByPk(req.params.id, {
            attributes: {exclude: ['userId']}
        });
        
        if(operation === null)
            return res.status(404).send("Not found");

        if(operation.userId !== user.id) {
            return res.status(401).send("Access denied");
        }

        return res.json(operation);
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
}

/**
 *  Updates an existing Operation given by the id param
 */
exports.update = async function(req, res, next) {
    try {
        const user = res.locals.user;
        const operation = await Operation.findByPk(req.params.id);
        
        if(operation === null)
            return res.status(404).send("Not found");

        if(operation.userId !== user.id)
            return res.status(401).send("Access denied");

        const { concept, amount, date, categoryName } = req.body;

        const [category, _] = await Category.findOrCreate({
            where: { name: categoryName },
            defaults: {
              name: categoryName
            }
        });

        operation.set({
            concept,
            amount,
            date,
            categoryName: category.name,
            updatedAt: Date.now()
        });
        operation.changed('updatedAt', true); // Allow modification of updatedAt field
        
        await operation.save();

        return res.json(operation);
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
}

/**
 *  Deletes the Operation associated with the id param
 */
exports.delete = async function(req, res, next) {
    try {
        const user = res.locals.user;
        const operation = await Operation.findByPk(req.params.id);
        
        if(operation === null)
            return res.status(404).send("Not found");

        // Prevent authenticated user from modifying records that belong to another user
        if(operation.userId !== user.id) {
            return res.status(401).send("Access denied");
        }

        await operation.destroy();

        return res.status(204).send();
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
}

exports.getBalance = async function(req, res, next) {
    try {
        const user = res.locals.user;
        
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

        return res.json(resData);

    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
}
const { Operation } = require('../models');
const { ValidationError } = require('sequelize');

exports.index = async function(req, res, next) {
    try {
        const operations = await Operation.findAll();
        res.json(operations);
    } catch(err) {
        res.status(500).send();
    }
};

exports.create = async function(req, res, next) {
    try {
        const { concept, amount, type, date } = req.body;
        userId = 1;
        const newOperation = await Operation.create({concept, amount, type, date, userId});
        res.status(201).json(newOperation);
    } catch(err) {
        console.log(err)
        //Log error
    }
}

exports.get = async function(req, res, next) {
    try {
        const operation = await Operation.findByPk(req.params.id, {
            attributes: {exclude: ['userId']}
        });
        
        if(operation === null)
            return res.status(404).send("Not found");

        res.json(operation);
    } catch(err) {
        console.log(err)
        //Log error
    }
}

exports.update = async function(req, res, next) {
    try {
        const operation = await Operation.findByPk(req.params.id, {
            attributes: {exclude: ['userId']}
        });
        
        if(operation === null)
            return res.status(404).send("Not found");

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

exports.delete = async function(req, res, next) {
    try {
        const operation = await Operation.findByPk(req.params.id);
        
        if(operation === null)
            return res.status(404).send("Not found");

        await operation.destroy();

        res.status(204).send();
    } catch(err) {
        console.log(err)
        //Log error
    }
}
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
        const { concept, amount, type } = req.body;
        userId = 1;
        const newOperation = await Operation.create({concept, amount, type, userId});
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
            return res.status(404).json("Not found");

        res.json(operation);
    } catch(err) {
        console.log(err)
        //Log error
    }
}
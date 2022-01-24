'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ms = require('ms');
const { User } = require('../models');
const { responseCodes } = require('../config/constants');

const generateToken = exports.generateToken = function(userId, email, expiresIn) {
    return jwt.sign(
        { 
            userId,
            email
        },
        process.env.TOKEN_KEY,
        { 
            expiresIn 
        }
    );
}

exports.authenticateUser = async function(req, res, next) {
    try {
        const { email, password } = req.body;
        
        // Check if email exists in the database
        const user = await User.findOne({ where: {email: email} });
        
        if(user && await bcrypt.compare(password, user.password)) {
            const expiresIn = process.env.TOKEN_EXPIRATION_TIME || "30m";

            // Generate token
            const token = generateToken(user.id, user.email, expiresIn);

            const expiration = Date.now() + ms(expiresIn);

            return res.status(200).json({token: token, expiration});
        } else {
            return res
                    .status(responseCodes.invalidCredentials.status)
                    .send(responseCodes.invalidCredentials.details);
        }
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
};

exports.testToken = async function(req, res, next) {
    // Reaching this block means the token is valid
    return res.status(200).send("OK");
}
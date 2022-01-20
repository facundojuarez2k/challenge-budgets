'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { responseCodes } = require('../config/constants');

exports.authenticateUser = async function(req, res, next) {
    try {
        const { email, password } = req.body;
        
        // Check if email exists in the database
        const user = await User.findOne({ where: {email: email} });
        
        if(user && await bcrypt.compare(password, user.password)) {
            // Generate token
            const token = jwt.sign(
                { 
                    userId: user.id,
                    email: user.email
                },
                process.env.TOKEN_KEY,
                {
                    expiresIn: process.env.TOKEN_EXPIRATION_TIME || "30m",
                }
            );

            return res.status(200).json({token: token});
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
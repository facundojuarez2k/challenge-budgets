'use strict';

const bcrypt = require('bcrypt');
const { User } = require('../models');
const ms = require('ms');
const { responseCodes } = require('../config/constants');
const { generateToken } = require('./authController');

exports.create = async function(req, res, next) {
    try {
        const { email, password } = req.body;
        
        // Check if email exists in the database
        const existingUser = await User.findOne({ where: {email: email} });
        if(existingUser)
            return res
                    .status(responseCodes.alreadyExists.status)
                    .send({
                        ...responseCodes.alreadyExists.details,
                        message: "Email aready registered"
                    });

        const encryptedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await User.create({
            email: email,
            password: encryptedPassword
        });

        const expiresIn = process.env.TOKEN_EXPIRATION_TIME || "30m";

        // Generate token
        const token = generateToken(newUser.id, newUser.email, expiresIn);

        const expiration = Date.now() + ms(expiresIn);
        
        return res.status(201).json({userId: newUser.id, token, expiration});
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }    
};
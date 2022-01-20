'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.create = async function(req, res, next) {
    try {
        const data = {email, password} = req.body;
        
        // Check if email exists in the database
        const existingUser = await User.findOne({ where: {email: email} });
        if(existingUser)
            return res.status(409).send("Email already registered");

        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await User.create({
            email,
            password: encryptedPassword
        });

        // Generate token
        const token = jwt.sign(
            { 
                userId: newUser.id,
                email: newUser.email
            },
            process.env.TOKEN_KEY,
            {
                expiresIn: process.env.TOKEN_EXPIRATION_TIME || "30m",
            }
        );
        
        res.status(201).json({userId: newUser.id, token});
    } catch(err) {
        console.log(err);
        res.status(500).send();
    }    
};
'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.authenticateUser = async function(req, res, next) {
    try {
        const data = {email, password} = req.body;
        
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

            res.status(200).json({token: token});
        } else {
            return res.status(400).send("Invalid credentials");
        }
    } catch(err) {
        console.log(err);
        res.status(500).send();
    }
};
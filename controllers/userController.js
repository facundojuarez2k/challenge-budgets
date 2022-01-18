const bcrypt = require('bcrypt');
const { User } = require('../models');

exports.create = async function(req, res, next) {
    const data = {email, password} = req.body;

    try {
        // Check if email exists in the database
        const existingUser = await User.findOne({ where: {email: email} });
        console.log(existingUser)
        if(existingUser)
            return res.status(409).send("Email already registered");

        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await User.create({
            email,
            password: encryptedPassword
        });

        // Generate token
        /*
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "30m",
            }
        );
        */

        res.send(newUser);
    } catch(err) {
        console.log(err);
        res.status(500).send()
    }

    
};
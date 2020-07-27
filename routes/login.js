const jwt = require('jsonwebtoken');
const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/', async (req, res) => {
    // Validates the login information from the client
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    // Validate if we have a user with the given email
    let user; // await get user with request email
    if (!user) return res.status(400).send('Invalid email or password.');

    // Validate if the user entered the correct password
    // This method hashes the client provided password with salt to compare with the password on file
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    // Generate a jsonWebToken to be sent back to the client
    const payload = {/*Get logged in user infor here id, adminStatus */}
    const token = jwt.sign(payload, config.get('secretKey'));

    // If all those pass we have a valid login so return the token back to the client
    res.send(token); 
})

function validate(request) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
    }

    return Joi.validate(request, schema)
}

module.exports = router;
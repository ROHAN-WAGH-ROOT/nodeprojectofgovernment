const jwt = require('jsonwebtoken');
const messages = require('../constants/messages');
const signUp = require('../Model/signUp');

const auth = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (bearerHeader) {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;

        try {
            jwt.verify(bearerToken, process.env.TOKEN_KEY, async (err, data) => {
                if (err) {
                    return res.status(401).json(messages.UNAUTHORIZED_ACCESS);
                } else {
                    const userData = await signUp.findOne({ _id: data.id });
                    if (userData) {
                        req.user = userData;
                        next();
                    } else {
                        res.status(401).json({ msg: 'user not found' });
                    }
                }
            });
        } catch (err) {
            console.log(err);
            res.status(401).send(messages.UNAUTHORIZED_ACCESS)
        }
    } else {
        // Forbidden
        res.status(403).json({ msg: "Token not found" });
    }

}
module.exports = { auth }
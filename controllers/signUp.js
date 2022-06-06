const signUp = require('../Model/signUp');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { signUpValidation } = require('../validation/signUpValidation');
const messages = require("../constants/messages")

const userSignUp = async (req, res) => {
    try {
        const user = await signUp.findOne({ email: req.body.email });
        const result = await signUpValidation.validateAsync(req.body);
        if (user && result) {
            return res.status(400).json({ ...messages.ALREADY_EXIST })
        }
        if (result) {
            const signup = await signUp.create(req.body);
            const token = jwt.sign({ id: signup._id }, process.env.TOKEN_KEY, { expiresIn: '7d' });
            return res.status(201).json({
                user,
                token,
                ...messages.REGISTER_SUCCESS, signup
            });
        }
        res.status().json({ msg: "" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ ...messages.SERVER_ERROR })
    }
}

const getSignUp = async (req, res) => {
    try {
        const getSignUp = await signUp.find();
        res.status(200).json({ ...messages.REGISTER_SUCCESS, getSignUp })
    } catch (error) {
        console.log(error)
        res.status(500).json({ ...messages.SERVER_ERROR })
    }

}

const signIn = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await signUp.findOne({ email: email });
        const auth = await bcrypt.compare(password, user.password);
        if (auth && user) {
            const token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY, { expiresIn: '7d' });
            return res.status(200).json({
                user,
                token,
                ...messages.LOGIN_SUCCESS,
            })
        } else {
            return res.status(500).json({ ...messages.INVALID_CREDENTIALS })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ ...messages.SERVER_ERROR })
    }
}

module.exports = {
    userSignUp,
    getSignUp,
    signIn
};
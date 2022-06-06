const Joi = require("joi");

const signUpValidation = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email(),
    password: Joi.string().required(),
    token: Joi.string(),
})
module.exports = { signUpValidation }
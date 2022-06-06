const Joi = require('joi');
const authoritiesValidation = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    // address: {
        city: Joi.string(),
        taluka: Joi.string(),
        district: Joi.string(),
        pincode: Joi.number(),
        addressLine1: Joi.string(),
        addressLine2: Joi.string(),
    // },
    userId: Joi.string()
}
)
module.exports = { authoritiesValidation };
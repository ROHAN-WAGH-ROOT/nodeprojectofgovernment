const Joi = require("joi");


const serviceValidation = Joi.object({
    name: Joi.string(),
    providedAuthorities: Joi.object(),
    type: Joi.string(),
    higherAuthority: Joi.string(),
    price: Joi.number(),
    estimatedTime: Joi.string(),
    // requiredDocuments: {
        documentName: Joi.string(),
        copies: Joi.number(),
        isXerox: Joi.boolean(),
    // },
    description: Joi.string(),
    preRequisites: Joi.string(),
    authorityId: Joi.string()
})
module.exports = { serviceValidation }
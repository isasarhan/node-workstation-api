const { Schema, model } = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')

const schema = new Schema({
    name: { type: String, required: true, minlength: 5, maxlength: 10 },
    mobile: { type: String, required: true },
    home: { type: String },
})

const Customer = model('Customer', schema)

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().required().min(5).max(10),
        mobile: Joi.string().required(),
        home: Joi.string().required().min(5).max(1024),
    })
    return schema.validate(customer)
}

module.exports = { Customer, validateCustomer }
const { Schema, model } = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')

const schema = new Schema({
    name: { type: String, required: true, minlength: 5, maxlength: 10 },
    email: { type: String, required: true },
    password: { type: String, required: true, minlength: 5, maxlength: 1024 },
    isAdmin: { type: Boolean, default: false },

})
schema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, name: this.name, email:this.email, isAdmin: this.isAdmin }, process.env.jwtSecretKey)
    return token
}

const User = model('User', schema)

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().required().min(5).max(10),
        email: Joi.string().required(),
        password: Joi.string().required().min(5).max(1024),
    })
    return schema.validate(user)
}

module.exports = { User, validateUser }
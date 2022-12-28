const { model, Schema } = require('mongoose')
const Joi = require('joi')

const paymentSchema = new Schema({

    customer: {
        _id: false,
        customerid: { type: String, required: true, unique: true },
        name: { type: String, required: true }
    },
    gold: { type: Number },
    cash: { type: Number },
    date: { type: Date, default: Date.now }
})

const validatePayment = (payment) => {
    const schema = Joi.object({
        customerid: Joi.objectId().required(),
        name: Joi.string().required(),
        gold: Joi.number(),
        cash: Joi.number(),
        date: Joi.date()
    })
    return schema.validate(payment)
}

module.exports = model('payment', validatePayment)

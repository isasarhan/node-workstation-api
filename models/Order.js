const Joi = require('joi')
const { model, Schema } = require('mongoose')


const orderSchema = new Schema({
    weight: { type: Number, required: true, },
    finnes: { type: String, required: true },
    perGram: { type: Number, required: true, },
    bonuses: { type: Number },
    date: { type: Date, default: Date.now }
})
const Order = model("Order", orderSchema)

const validateOrder = (order) => {
    const schema = Joi.object({
        weight: Joi.number(),
        finnes: Joi.string(),
        perGram: Joi.number(),
        bonuses: Joi.number(),
        date: Joi.date()
    })
    return schema.validate(order)
}
module.exports = { Order, orderSchema, validateOrder }
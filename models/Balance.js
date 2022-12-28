const Joi = require('joi')
const { model, Schema } = require('mongoose')

const balanceSchema = new Schema({
    customer: {
        _id: false,
        customerid: { type: String, required: true, unique: true },
        name: { type: String, required: true }
    },
    gold: { type: Number, default: 0 },
    cash: { type: Number, default: 0 },
})

const Balance = model('Balance', balanceSchema)

function validateBalance(balance) {
    const schema = Joi.object({
        customerid: Joi.objectId().required(),
        name: Joi.string().required(),
        gold: Joi.number(),
        cash: Joi.number()
    }) 
    return schema.validate(balance)

}
module.exports = { Balance, validateBalance }
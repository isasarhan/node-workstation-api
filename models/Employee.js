const mongoose = require('mongoose')
const Joi = require('joi')

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    gender: { type: String  },
    avatar: { type: String },
    designation: { type: String },
    mobile: { type: String, required: true },
    salary: { type: Number, required: true }
})
const Employee = mongoose.model("Employee", employeeSchema)

function validateEmployee(employee) {
    const schema = Joi.object({
        name: Joi.string().required(),
        mobile: Joi.string().required(),
        salary: Joi.number().required(),
    })

    return schema.validate(employee)
}

module.exports = { employeeSchema, Employee, validateEmployee }

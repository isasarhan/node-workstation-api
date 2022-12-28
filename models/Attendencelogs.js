const mongoose = require('mongoose');
const Joi = require('joi')

const attendenceSchema = new mongoose.Schema({
    employee: {
        type: new mongoose.Schema({
            _id: false,
            employeeId: { type: String },
            name: { type: String },
        })
    },
    checkIn: { type: Date, default: Date.now },
    checkOut: { type: Date, default: Date.now },

})

const Attendence = mongoose.model("Attendence", attendenceSchema)

function validateAttendence(attendence) {
    const schema = Joi.object({
        employeeId: Joi.required().objectId(),
        name: Joi.string().required(),
        checkIn: Joi.date(),
        checkOut: Joi.date(),
    })
    return schema.validate(attendence)
}
module.exports = { Attendence, validateAttendence }
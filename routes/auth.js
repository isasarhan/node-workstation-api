const express = require('express')
const router = express.Router()
const Joi = require('joi')
const { User } = require('../models/User')
const bcrypt = require('bcrypt')

//login
router.post('/', async (req, res) => {
    const { error } = validateUser(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send("Invalid Email or Password!")

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send("Invalid Email or Password!")

    const token = user.generateAuthToken()
    res.send(token)
})


function validateUser(user) {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    })
    return schema.validate(user)
}
module.exports = router
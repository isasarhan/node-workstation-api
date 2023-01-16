const express = require('express')
const router = express.Router()
const Joi = require('joi')
const { User, validateUser } = require('../models/User')
const bcrypt = require('bcrypt')
const _ = require('lodash')

//login
router.post('/login', async (req, res) => {
    const { error } = validateUser(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send("Invalid Email or Password!")

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send("Invalid Email or Password!")

    const token = user.generateAuthToken()
    user = _.pick(user, ['_id', 'name', 'email'])
    res.json({ token, user})
})
//register
router.post("/register", async (req, res) => {
    const { error } = validateUser(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    let newUser = new User(
        {
            email: req.body.email,
            password: req.body.password,
            name: req.body.name
        }
    )

    const user = await User.findOne({ email: newUser.email })
    if (user) return res.status(400).send("User already exits")

    const salt = await bcrypt.genSalt(10)

    const token = newUser.generateAuthToken()

    newUser.password = await bcrypt.hash(newUser.password, salt)
    await newUser.save()
    res.header('x-auth-token', token)
    .header('access-control-expose-headers', 'x-auth-token')
    .json(_.pick(newUser, ['_id', 'name', 'email']))
})

module.exports = router
const express = require('express')
const { User, validateUser } = require('../models/User')
const router = express()
const _ = require('lodash')
const bcrypt = require('bcrypt')

router.get('/', async (req, res) => {
    const users = await User.find()
    res.send(users).status(200)
})

router.get("/:id", async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) res.status(404).send("User not found")
})

router.post("/", async (req, res) => {
    const userReq = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    const { error } = validateUser(userReq)
    if (error) return res.status(400).send(error.details[0].message)
    const user = await User.findOne({ email: req.body.email })
   
    if (user) return res.status(400).send("User already exits")
    
    const salt = await bcrypt.genSalt(10)
    const newUser = new User(_.pick(userReq, [ 'name','email', 'password']))
    const token = newUser.generateAuthToken()
    
    newUser.password = await bcrypt.hash(newUser.password, salt)
    await newUser.save()
    res.header('x-auth-token', token).json(_.pick(newUser, ['_id', 'name', 'email']))
})

module.exports = router
const express = require('express')
const { User, validateUser } = require('../models/User')
const router = express.Router()
const _ = require('lodash')
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

router.get('/', auth, async (req, res) => {
    const users = await User.find()
    res.send(users).status(200)
})

router.get("/:id", async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) res.status(404).send("User not found")
    res.json(user).status(200)
})

router.put('/:id', auth, async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    req.body.password = await bcrypt.hash(req.body.password, salt)

    const user = User.findByIdAndUpdate(
        req.body.id,
        {
            $set: req.body
        },
        { new: true }
    )
    res.send(user)

})
router.delete('/:id', [auth, admin], async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id)
    if(!user) return res.status(404).send("User not found")
    res.status(200).send("User deleted").json(user)
})
module.exports = router
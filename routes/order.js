const express = require('express')
const admin = require('../middleware/admin')
const auth = require('../middleware/auth')
const { Order, validateOrder } = require('../models/Order')
const router = express.Router()

router.get('/', async (req, res) => {
    const order = await Order.find()
    res.json(order)
})

router.get('/:id', async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (!order) res.status(404).send('Order not found')

    res.json(order).status(200)
})

router.post('/', async (req, res) => {
    const { error } = validateOrder(req.body)

    if (error) return res.status(400).send(error.details[0].message)
    const order = new Order({
        weight: req.body.weight,
        finnes: req.body.finnes,
        date: req.body.date,
        perGram: req.body.perGram,
        bonuses: req.body.bonuses
    })
    const newOrder = await order.save()

    res.json(newOrder).status(201).end()
})
router.put('/:id', async (req, res) => {
    const { error } = validateOrder(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        { new: true }
    )
    if (!order) res.status(404).send('Order not found')
    res.json(order).status(200)
})

router.delete('/:id', [auth, admin], async (req, res) => {
    const deleted = await Order.findByIdAndRemove(req.params.id)
    if (!deleted) res.status(404).send('Order not found')
    res.json(deleted).status(200)
})

module.exports = router

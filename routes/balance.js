const express = require('express')
const router = express.Router()
const { Balance, validateBalance } = require("../models/balance")
const { Customer } = require('../models/Customer')

router.get('/', async (req, res) => {
    const balances = await Balance.find()
    res.json(balances).status(200).end()
})

router.get('/:id', async (req, res) => {
    const balance = await Balance.findById(req.params.id)
    if (!balance) return res.status(404).send("Balance doesnt exist").end()
    res.json(balance).status(200).end()
})

router.post('/', async (req, res) => {
    console.log(req.body);
    const { error } = validateBalance(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const customer = await Customer.findById(req.body.customerid)
    if (!customer) return res.status(404).send("Customer doesnt exist").end()

    
    let balance = new Balance({
        cash: req.body.cash,
        gold: req.body.gold,
        customer: {
            customerid: req.body.customerid,
            name: req.body.name
        } 
    })
    balance = await balance.save()
    res.send(balance).status(201).end()
})
router.put('/:id', async (req, res) => {
    const { error } = validateBalance(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const customer = await Customer.findById(req.body.customerid)
    if (!customer) return res.status(404).send("Customer doesnt exist").end()

    let balance = await Balance.findByIdAndUpdate(req.params.id,
        {
            cash: req.body.cash,
            gold: req.body.gold,
            customer: {
                customerid: req.body.customerid,
                name: req.body.name
            }
        }, { new: true }
    )
    if (!balance) return res.status(404).send("Balance doesnt exist").end()
    res.json(balance).status(200).end()
})
router.delete('/:id', async (req, res) => {
    const deleted = await Balance.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).send("Balance doesnt exist").end()
    res.send(deleted)

})
module.exports = router
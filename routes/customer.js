const express = require('express')
const router = express.Router()
const { Customer, validateCustomer } = require('../models/Customer')

router.get('/', (req, res) => {
    const customers = Customer.find()
    res.send(customers)
})

router.get("/:id", (req, res) => {
    const customer = Customer.findById(req.params.id)
    if (!customer) return res.status(404).send("Customer Not Found!")

    res.json(customer).status(200)
})

router.post("/", (req, res) => {
    const customer = Customer.findOne({ name: req.body.name })
    if(customer) return res.status(400).send("Customer already exits")

    
})

module.exports = router
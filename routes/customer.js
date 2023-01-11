const express = require('express')
const admin = require('../middleware/admin')
const auth = require('../middleware/auth')
const router = express.Router()
const { Customer, validateCustomer } = require('../models/Customer')

router.get('/', async (req, res) => {
    const customers = await Customer.find()
    res.json(customers)
})

router.get("/:id", async (req, res) => {
    const customer = await Customer.findById(req.params.id)
    if (!customer) return res.status(404).send("Customer Not Found!")
    res.json(customer).status(200)
})

router.post("/", async (req, res) => {
    let customer = new Customer({
        name: req.body.name,
        mobile: req.body.mobile,
        home: req.body.home,
        address: {
            city: req.body.city,
            country: req.body.country,
        },
    })
    const { error } = validateCustomer(req.body)
    if (error) return res.send(error.details[0].message)

    const searched = await Customer.findOne({ name: customer.name })

    if (searched) return res.status(400).send("Customer already exits")
    customer = await customer.save()

    res.send(customer)
})

router.put('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const customer = await Customer.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            mobile: req.body.mobile,
            home: req.body.home,
            address: {
                city: req.body.city,
                country: req.body.country,
            }, 
        },
        { new: true }
    )
    if (!customer) return res.status(404).send("Customer Not Found!!")

    res.send(customer).status(200).end()
})

router.delete('/:id', [auth, admin], async (req, res) => {
    const customer = await Customer.findById(req.params.id)
    if (!customer) return res.status(404).send("Customer Not Found!")
    const deleted = await Customer.deleteOne(customer)
    res.send(deleted)
})

module.exports = router
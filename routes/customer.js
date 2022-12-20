const express = require('express')
const router = express()
const { Customer, validateCustomer } = require('../models/Customer')

router.get('/', (req, res) => {
    const customers = Customer.find()
    res.send(customers)
})




module.exports = router
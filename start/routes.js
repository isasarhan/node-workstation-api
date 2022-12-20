const express = require('express')
const userRouter = require('../routes/user')
const customerRouter = require('../routes/customer')

module.exports = (app) => {
    app.use(express.json())
    app.use('/api/users/', userRouter)
    app.use('/api/customers/', customerRouter)
}
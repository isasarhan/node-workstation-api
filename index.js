const express = require('express')
const logger = require('./start/logger')
// const dotenv = require('dotenv')
const cors = require('cors')
const app = express()


// dotenv.config()
// app.use(cors())

// require('./start/routes')(app)
require('./start/db')()
app.get('/', async (req, res) => {
    const customers = await Customer.find()
    res.json(customers)
})

require('./start/validation')()
// require('./start/prod')(app)

const PORT = process.env.PORT || 2000;
app.listen(PORT, '0.0.0.0',
() => logger.info(`listening to port ${PORT}...`))





const customerRouter = require('./routes/customer')
const balanceRouter = require('./routes/balance')
const { Customer } = require('./models/Customer')
    // app.use('/api/customers/', customerRouter)
    // app.use('/api/balance/', balanceRouter)
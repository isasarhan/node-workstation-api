const express = require('express')
const app = express()
const logger = require('./start/logger')
const dotenv = require('dotenv')
const cors = require('cors')


const customerRouter = require('./routes/customer')
const balanceRouter = require('./routes/balance')

dotenv.config()

app.use(cors())
require('./start/db')()
app.use(express.json())
require('./start/routes')(app)

app.use('/api/customers/', customerRouter)
app.use('/api/balances/', balanceRouter)

require('./start/validation')()

const PORT = process.env.PORT || 2000;
app.listen(PORT, '0.0.0.0',
    () => logger.info(`listening to port ${PORT}...`))


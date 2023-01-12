const express = require('express')
const app = express()
const logger = require('./start/logger')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')

const customerRouter = require('./routes/customer')
const balanceRouter = require('./routes/balance')

dotenv.config()
mongoose.set('strictQuery', false);
    mongoose.connect(process.env.db)
        .then(() => logger.info('connecting to database...'))

// app.use(cors())
// require('./start/db')()
// require('./start/routes')(app)

app.use('/api/customers/', customerRouter)
app.use('/api/balance/', balanceRouter)

require('./start/prod')(app)
require('./start/validation')()

const PORT = process.env.PORT || 2000;
app.listen(PORT, '0.0.0.0',
    () => logger.info(`listening to port ${PORT}...`))


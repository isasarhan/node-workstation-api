const dotenv = require('dotenv')
const logger = require('./start/logger')
const express = require('express')
const app = express()
const cors = require('cors')
const customerRouter = require('./routes/customer')

dotenv.config()

app.use(cors())
// require('./start/routes')(app)
require('./start/db')()
require('./start/validation')()
require('./start/prod')(app)
app.use(express.json())

app.use('/api/customers/', customerRouter)
app.use(errorHandler)


const PORT = process.env.PORT || 2000;
app.listen(PORT, '0.0.0.0',
    () => logger.info(`listening to port ${PORT}...`))


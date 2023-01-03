const dotenv = require('dotenv')
const logger = require('./start/logger')
const express = require('express')
const app = express()
const customerRouter = require('./routes/customer')
const { errorHandler } = require('./middleware/error')


dotenv.config()
const PORT = process.env.PORT || 2000;

require('./start/db')()
// require('./start/routes')(app)
app.use(express.json())
app.use('/api/customers/', customerRouter)
require('./start/validation')()
require('./start/prod')(app)
app.use(errorHandler)

app.listen(PORT, '0.0.0.0',
    () => logger.info(`listening to port ${PORT}...`))


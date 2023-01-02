const dotenv = require('dotenv')
const logger = require('./start/logger')
const express = require('express')


dotenv.config()
const app = express()

require('./start/db')()
require('./start/routes')(app)
require('./start/validation')()
require('./start/prod')(app)

app.listen(process.env.PORT || 2000,
    () => logger.info(`listening to port ${process.env.PORT}...`))


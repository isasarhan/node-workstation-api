const dotenv = require('dotenv')
const logger = require('./start/logger')
const express = require('express')


dotenv.config()
const app = express()

require('./start/db')()
require('./start/routes')(app)
require('./start/validation')()


app.listen(process.env.PORT || 200,
    () => logger.info(`listening to port ${process.env.PORT}...`))


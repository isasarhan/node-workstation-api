const dotenv = require('dotenv')
const logger = require('./start/logger')
const express = require('express')
const PORT = process.env.PORT || 5000;
const app = express()


dotenv.config()

require('./start/db')()
require('./start/routes')(app)
require('./start/validation')()
require('./start/prod')(app)


app.listen(PORT,'0.0.0.0',
    () => logger.info(`listening to port ${PORT}...`))


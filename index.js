const dotenv = require('dotenv')
const logger = require('./start/logger')
const express = require('express')
const app = express()
const cors = require('cors')

dotenv.config()

app.use(cors())
require('./start/routes')(app)
require('./start/db')()
require('./start/validation')()
require('./start/prod')(app)


const PORT = process.env.PORT || 2000;
app.listen(PORT, '0.0.0.0',
    () => logger.info(`listening to port ${PORT}...`))


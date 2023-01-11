const express = require('express')
const app = express()
const logger = require('./start/logger')
const dotenv = require('dotenv')
const cors = require('cors')


const customerRouter = require('./routes/customer')
const userRouter = require('./routes/user')

dotenv.config()

app.use(cors())
require('./start/db')()
app.use(express.json())

app.use('/api/customers/', customerRouter)
app.use('/api/users/', userRouter)

require('./start/validation')()

const PORT = process.env.PORT || 2000;
app.listen(PORT, '0.0.0.0',
    () => logger.info(`listening to port ${PORT}...`))


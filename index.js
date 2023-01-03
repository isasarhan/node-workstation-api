const dotenv = require('dotenv')
const logger = require('./start/logger')
const express = require('express')
const app = express()
dotenv.config()
const PORT = process.env.PORT || 2000;

const userRouter = require('./routes/user')
const customerRouter = require('./routes/customer')
const authRouter = require('./routes/auth')
const orderRouter = require('./routes/order')
const employeeRouter = require('./routes/employee')
const balanceRouter = require('./routes/balance')
const attendenceRouter = require('./routes/attendence')
const { errorHandler } = require('./middleware/error')

// require('./start/routes')(app)
app.use(express.json())
app.use('/api/attendence/', attendenceRouter)
app.use('/api/auth/', authRouter)
app.use('/api/balance/', balanceRouter)
app.use('/api/customers/', customerRouter)
app.use('/api/employees/', employeeRouter)
app.use('/api/orders/', orderRouter)
app.use('/api/users/', userRouter)
app.use(errorHandler)
require('./start/db')()
require('./start/validation')()
require('./start/prod')(app)

app.listen(PORT, '0.0.0.0',
    () => logger.info(`listening to port ${PORT}...`))


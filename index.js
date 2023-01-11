const express = require('express')
const app = express()
const logger = require('./start/logger')
const dotenv = require('dotenv')
const cors = require('cors')


const userRouter = require('./routes/user')
const customerRouter = require('./routes/customer')
const authRouter = require('./routes/auth')
const orderRouter = require('./routes/order')
const employeeRouter = require('./routes/employee')
const balanceRouter = require('./routes/balance')
const attendenceRouter = require('./routes/attendence')
dotenv.config()

app.use(cors())
require('./start/db')()

app.use('/api/attendence/', attendenceRouter)
app.use('/api/auth/', authRouter)
app.use('/api/balance/', balanceRouter)
app.use('/api/customers/', customerRouter)
app.use('/api/employees/', employeeRouter)
app.use('/api/orders/', orderRouter)
app.use('/api/users/', userRouter)
require('./start/validation')()


const PORT = process.env.PORT || 2000;
app.listen(PORT, '0.0.0.0',
    () => logger.info(`listening to port ${PORT}...`))


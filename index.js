const express = require('express')
// // const logger = require('./start/logger')
// // const dotenv = require('dotenv')
// const cors = require('cors')
// const app = express()


// // dotenv.config()
// // app.use(cors())

// // require('./start/routes')(app)
// require('./start/db')()

// app.get('/', async (req, res) => {
//     res.json(customers)
// })

// require('./start/validation')()
// // require('./start/prod')(app)

// const PORT = process.env.PORT || 3333;

// // app.listen(PORT, () => logger.info(`listening to port ${PORT}...`))
// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
//   });



// // const customerRouter = require('./routes/customer')
// // const balanceRouter = require('./routes/balance')
// // const { Customer } = require('./models/Customer')
// //     // app.use('/api/customers/', customerRouter)
// //     // app.use('/api/balance/', balanceRouter)s



const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(express.raw({ type: "application/vnd.custom-type" }));
app.use(express.text({ type: "text/html" }));

app.get("/", async (req, res) => {
  res.json({ message: "Please visit /countries to view all the countries" });
});

app.use("/countries", countryRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
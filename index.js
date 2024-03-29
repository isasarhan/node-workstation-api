const express = require('express')
const logger = require('./start/logger')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3333;


dotenv.config()

app.use(cors())

app.get('/', (req, res) => {
    res.json({ message: "WELCOME!!  !"})
})


require('./start/db')()
require('./start/routes')(app)
require('./start/validation')()
require('./start/prod')(app)


// app.listen(PORT, () => ))
app.listen(port, () => {
  logger.info(`listening to port ${port}...`  )
})
  



// // const customerRouter = require('./routes/customer')
// // const balanceRouter = require('./routes/balance')
// // const { Customer } = require('./models/Customer')
// //     // app.use('/api/customers/', customerRouter)
// //     // app.use('/api/balance/', balanceRouter)s




// "use strict";
// var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
//     return new (P || (P = Promise))(function (resolve, reject) {
//         function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//         function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//         function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
//         step((generator = generator.apply(thisArg, _arguments || [])).next());
//     });
// };
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// // import "./lib/db";
// const express_1 = __importDefault(require("express"));
// // import countryRoutes from "./routes/country";
// const app = (0, express_1.default)();
// const port = process.env.PORT || 3333;
// app.use(express_1.default.json());
// app.use(express_1.default.raw({ type: "application/vnd.custom-type" }));
// app.use(express_1.default.text({ type: "text/html" }));
// app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
//     res.json({ message: "Testing" });
// }));
// // app.use("/countries", countryRoutes);
// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
// });

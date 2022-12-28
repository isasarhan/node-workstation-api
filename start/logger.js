const winston = require('winston')
require('express-async-errors')

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        // new winston.transports.File({ filename: 'logfile.log' })
    ]
});
winston.add(logger)

module.exports = logger
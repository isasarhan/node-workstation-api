const logger = require('../start/logger')

function errorHandler(err, req, res, next) {
    //log the exception
    logger.error(err.message, err)
    res.status(500).send("Something went wrong")
}

module.exports = {errorHandler}
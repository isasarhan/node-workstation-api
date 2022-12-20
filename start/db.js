const mongoose = require('mongoose')
const logger = require('../start/logger')


module.exports = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.db)
        .then(() => logger.info('connecting to database...'))
}
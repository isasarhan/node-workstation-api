const helmet  = require('helmet')
const compression  = require('compression')

app.use(helmet())
app.use(compression()) 
module.exports = function(app) {
}
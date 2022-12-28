const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const token  = req.header('x-auth-token')
    if(!token) return res.status(401).send("Access denied no token found")
    try{
        const decoded = jwt.verify(token, process.env.jwtSecretKey)
        //or I can use a callback function
        
        //the token includes the user
        req.user = decoded
    }catch(err){
        res.status(400).send("Invalid token!")
    }
}
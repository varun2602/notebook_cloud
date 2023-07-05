var jwt = require("jsonwebtoken")
var JWT_SECRET = "VARUN_K"

const fetchuser = function(req,res,next){
    // Get the user from jwt token 
    const token = req.header("auth-token")
    if(!token){
        return res.status(401).send({error:"Please authenticate using a valid token"})
    }
    try{
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user
        next()
    } catch{
        res.status(401).send({error:"Please authenticate using a valid token"})

    }
    
}

module.exports = fetchuser
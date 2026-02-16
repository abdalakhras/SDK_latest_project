const jwt = require('jsonwebtoken')

const userAuth = async (req,res,next) => {
    
       let token = req.cookies.token
try {
    if(!token){
       return res.status(401).json({message:'token not found'})
    }
    const decode = jwt.verify(token,process.env.JWT_SECRET)
    req.Authorized = decode //req.Authorized => (Authorized) is optional name , you can name it whaterver , important is req obj => ex: req.anything
    next()
} catch (error) {
    res.status(500).json({message:error.message})
}
}
module.exports = userAuth
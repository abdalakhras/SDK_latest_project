const jwt = require('jsonwebtoken')

const adminAuth = async (req,res,next) => {
    let token = req.cookies.token
    try {
        if(!token){
           return res.status(401).json({message:'no token found'})
        }
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        
        if(decode.role !=='Admin'){
           return res.status(403).json({message:'not Authoroized'})
        }
        req.Authorized = decode
        next()

    } catch (error) {
          res.status(500).json({message:error.message})
    }
}
module.exports = adminAuth
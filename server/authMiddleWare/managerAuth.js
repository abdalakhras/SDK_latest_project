const jwt = require('jsonwebtoken')

const managerAuth = async (req,res,next) => {
    let token = req.cookies.token
    try {
        if(!token){
           return res.status(401).json({message:'no token found'})
        }
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        
        if (!['manager', 'Admin'].includes(decode.role)) {
    return res.status(403).json({ message: 'not Authorized' });
}
        req.Authorized = decode
        next()

    } catch (error) {
          res.status(500).json({message:error.message})
          console.log(error.message)
    }
}
module.exports = managerAuth
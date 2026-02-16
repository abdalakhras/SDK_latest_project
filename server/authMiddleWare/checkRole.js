const adminAuth = require('./adminAuth')
const userAuth = require('./userAuth')

const checkRole = (allowedRoles)=>{
    return async (req,res,next) => {
        if(req.Authorized && allowedRoles.includes(req.Authorized.role)){ // req.Authorized is where the token stored = decode
            console.log(`user role : ${req.Authorized.role}`, "allowedRoles :" ,allowedRoles)
            next()
        }else{
            return res.status(403).json({message:'not authorixzed'})
        }
    }

}
module.exports = checkRole
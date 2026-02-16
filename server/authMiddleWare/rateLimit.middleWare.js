const rateLimit = require('express-rate-limit')

 const globalRateLimit = rateLimit({
    windowMs: 15*60*1000,
    max:100,
    message:{
        message:"too many request,please try later"
    },
    standardHeaders:true,
    legacyHeaders:false
})

const authRateLimit = rateLimit({
windowMs: 15*60*1000,
    max:100,
    message:{
        message:"too many attempts,please try later"
    },
})
module.exports = {globalRateLimit,authRateLimit}
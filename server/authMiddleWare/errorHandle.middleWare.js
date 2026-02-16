export const globalErrorHandler = (err,req,res,next)=>{
    err.statuCode = err.statuCode || 500
    err.status = err.status || 'error'

    res.status(err.statuCode).json({
        status:err.status,
        message:err.message
    })
}
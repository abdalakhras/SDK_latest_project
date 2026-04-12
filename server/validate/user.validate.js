import joi from "joi"

export const RegisterSchema = joi.object({

    username : joi.string().min(3).max(20).required(),
    email:joi.string().min(5).required(),
    password:joi.string().min(3).required(),
    role : joi.string().valid('user','Admin').default('user')

})

export const LoginSchema = joi.object({
    email:joi.string().min(5).required(),
    password:joi.string().min(3).required()
})

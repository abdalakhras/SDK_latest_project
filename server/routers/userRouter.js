const express = require('express')
const {userCreate,userUpdate,userLogin,deleteUser,getUsers,updateuserPass,Profile,Role,updateByAdmin,updatepassByAdmin} = require('../controller/usersController')
const userAuth = require('../authMiddleWare/userAuth')
const adminAuth  =require('../authMiddleWare/adminAuth')
const {validate} = require('../authMiddleWare/validate.MiddleWare')
const { RegisterSchema, LoginSchema } = require('../validate/user.validate')
const { authRateLimit } = require('../authMiddleWare/rateLimit.middleWare')
const checkRole = require('../authMiddleWare/checkRole')

const router = express.Router()

//user

router.post('/createuser',validate(RegisterSchema),authRateLimit,userCreate)
router.put('/updateUser/',userAuth,userUpdate)
router.put('/updateuserpass',userAuth,updateuserPass)
router.post('/login',validate(LoginSchema),authRateLimit,userLogin)
router.get('/profile',userAuth,Profile)
router.get('/checkuserrole',userAuth,Role) // check user/Admin Role

// Admin 
router.post('/creatuserByAdmin',adminAuth,userCreate)
router.get('/getusers',adminAuth,getUsers)
router.delete('/delete/:id',adminAuth,deleteUser)
router.put('/updateByAdmin',adminAuth,updateByAdmin)
router.put('/updatepass',adminAuth,updatepassByAdmin)
module.exports = router
const express = require('express')

const {addToCart,getCartItems} = require('../controller/cartController')
const userAuth = require('../authMiddleWare/userAuth')

const router = express.Router()

router.post('/addtocart',userAuth,addToCart)
router.get('/getcart',userAuth,getCartItems)

module.exports = router
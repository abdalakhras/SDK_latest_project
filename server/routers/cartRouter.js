const express = require('express')

const {addToCart,getCartItems} = require('../controller/cartController')

const router = express.Router()

router.post('/addtocart',addToCart)
router.get('/getcart',getCartItems)

module.exports = router
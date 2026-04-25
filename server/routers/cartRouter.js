const express = require('express')

const {addToCart,getCartItems, increaseItem, clearCart,decreaseItem,cleareItem} = require('../controller/cartController')
const userAuth = require('../authMiddleWare/userAuth')

const router = express.Router()

router.post('/addtocart',userAuth,addToCart)
router.get('/getcart',userAuth,getCartItems)
router.put ('/increasequantity',userAuth,increaseItem)
router.delete('/deletCart',userAuth,clearCart)
router.put('/decreasequantity',userAuth,decreaseItem)
router.put('/deleProduct',userAuth,cleareItem)
module.exports = router
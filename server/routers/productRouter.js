const express = require('express')
const {createProducts,getProducts,deleteProduct,updateProducts,findByPrice,getproductsBycategory} = require('../controller/productsController')
const adminAuth = require('../authMiddleWare/adminAuth')

const router = express.Router()

router.post('/craeteProduct',createProducts)
router.get('/getproducts',getProducts)
router.delete('/deleproduct/:id',deleteProduct)
router.put('/updateProduct',updateProducts)
router.get('/findbyprice',findByPrice)
router.get('/getproductsbycategory',getproductsBycategory)

module.exports = router
const express = require('express')
const {creatCategory,getCategory,deleteCategory,updateCategory,getctagabyId} = require('../controller/categoryController')

const router = express.Router()

router.post('/createCategory',creatCategory)
router.get('/getCategory',getCategory)
router.delete('/deleteCateg/:id',deleteCategory)
router.put('/updatecateg',updateCategory)
router.get('/getcategorybyid/:id',getctagabyId)
module.exports = router
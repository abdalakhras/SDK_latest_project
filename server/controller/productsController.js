const Product = require('../models/products')

exports.createProducts = async (req,res) => {
    const productsName = req.body.name
    const productDiscription = req.body.discription
    const productCategory = req.body.category 
    const ProductPrice = req.body.price 
    const prodctsImg = req.body.image

    try {
        const product = new Product({
            name:productsName,
            discription :productDiscription,
            category:productCategory,
            price:ProductPrice,
            img:prodctsImg
        })
        await product.save()
        res.status(200).json({message:'products created succefully',product})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}

exports.getProducts = async (req,res) => {

    try {
        const getProd = await Product.find()
        res.status(200).json(getProd)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
    
}
exports.deleteProduct = async (req,res) => {
    const id = req.params.id
    try {
        const delProd = await Product.findByIdAndDelete(id)
        if(!delProd){
            return res.status(401).json({message:'no such product'})
        }
        res.status(200).json({message:'product deleted',delProd})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}
exports.updateProducts = async (req,res) => {
    const id = req.body.id
    const productName = req.body.name
    const productdiscription = req.body.discription
    const productCategory = req.body.category
    const ProductPrice = req.body.price
    const productImg = req.body.image
    try {
        const updateProd = await Product.findByIdAndUpdate(id,{name:productName,discription:productdiscription,category:productCategory,price:ProductPrice,img:productImg})
        if(!updateProd){
            return res.status(401).json({message:'no such product'})
            
        }
        res.status(200).json({message:'updated successfully',updateProd})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}

exports.findByPrice = async (req,res) => {
    const price1 = req.body.price1
    const price2 = req.body.price2
    try {
        const findGrtOrLss = await Product.find({price:{$gt:price1,$lt:price2}}) 
        if(!findGrtOrLss){
            return res.status(401).json({message:"no products in this price range"})
        }   
        res.status(200).json(findGrtOrLss)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}
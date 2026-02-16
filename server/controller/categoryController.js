const Category = require('../models/category')

exports.creatCategory = async (req,res) => {
    
    try {
        const category = new Category({
            name:req.body.name,
            discription:req.body.discription,
            image:req.body.image 
        })
        await category.save()
        res.status(200).json({message:'category created successfully',category})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message})
    }
}
exports.getCategory = async (req,res) => {

    try {
        const getCateg = await Category.find()
        res.status(200).json(getCateg)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
    
}
exports.deleteCategory = async (req,res) => {
const id = req.params.id
    try {
        const delCatagory = await Category.findByIdAndDelete(id)
        if(!delCatagory){
            res.status(401).json({message:"category not found"})
        }
        res.status(200).json({message:"deleted succesfully",delCatagory})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
    
}

exports.updateCategory = async (req,res) => {
   
   const{id,name,discription,image} = req.body
    try {
        const updateCateg = await Category.findByIdAndUpdate(id,{name:name,discription:discription,image:image})
        if(!updateCateg){
            return res.status(401).json({message:'no such product'})
            
        }
        res.status(200).json({message:'updated successfully',updateCateg})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}
exports.getctagabyId = async (req,res) => {
    const id = req.params.id
    try {
        const findcatag = await Category.findById(id)
        if(!findcatag){
           return res.status(400).json({message:"no such catagory"})
        }
        res.status(200).json({message:'catagory founded',findcatag})
    } catch (error) {
        
     res.status(500).json({message:error.message})
    }
}
const Cart = require('../models/cart')

exports.addToCart = async (req,res) => {
    
    const userId = req.Authorized.id
     const {productsId,quantity} = req.body
    try {
        let cart = await Cart.findOne({user:userId})
        if(!cart){
            cart = await Cart.create({
                user:userId,
                items:[{productId:productsId,quantity:1}]
            });
            return res.status(200).json({
                cart,
                message: "cart created successfully"
            });
        }
 
            const existingItemIndex = cart.items.findIndex(item=> item.productId.toString() === productsId)

             if(existingItemIndex >=0){
            cart.items[existingItemIndex].quantity += 1
        }else{
            cart.items.push({productId:productsId,quantity:1})    
        }
         await cart.save()
        
      return  res.status(200).json({cart,message:'item added to cart successfully'})
        
    } catch (error) {
         res.status(500).json({message:error.message})
         console.log(error.message)
    }
}

exports.getCartItems = async (req,res) => {
   const userId = req.Authorized.id
    try {
        let cart = await Cart.findOne({user:userId}).populate('items.productId')
        if(!cart){
            return res.status(200).json({cart:[],message:"no cart items were found"})
        }
        return res.status(200).json({cart,message:"cart items fetched succefully"})
    } catch (error) {
         res.status(500).json({message:error.message})
         console.log(error.message)
    }
}
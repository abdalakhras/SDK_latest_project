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

exports.increaseItem = async (req,res) => {
   const userId = req.Authorized.id
   const {productsId} = req.body
   console.log(productsId)
    try {
        const cart = await Cart.findOne({user:userId})
        if(!cart)
            return console.log('no cart for such userId')
        
        const item = cart.items.find(itm=> itm.productId.toString() === productsId)
        if(!item)
            return res.status(400).json({message:"product in cart not found"})

        item.quantity +=1  
        await cart.save()

        const updatedCart = await Cart.findById(cart._id).populate('items.productId')
        return res.status(200).json({message:"product quantity updated successfully",updatedCart})

    } catch (error) {
        res.status(500).json({message:error.message})
         console.log(error.message)
    }
    
}

exports.clearCart = async (req,res) => {
    const userId = req.Authorized.id
    try {
        const cart = await Cart.findOne({user:userId})
        if(!cart){
            return res.status(400).json({message:"no cart found"})
        }
            cart.items = []
            await cart.save()
            const deletedCart = await Cart.findById(cart._id)
            return res.status(200).json({deletedCart,message:'cart has been emptied'})
    } catch (error) {
        res.status(500).json({message:error.message})
         console.log(error.message)
    }
}
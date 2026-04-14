const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({
    productId : {type:mongoose.Schema.Types.ObjectId,ref:"products",required:true},
    quantity : {type:Number,required:true,default:1}
})

const cartSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"users",required:true},
    items:[cartItemSchema]
}, 
{timestamps:true}
)

const Cart = mongoose.model("cart",cartSchema)
module.exports = Cart

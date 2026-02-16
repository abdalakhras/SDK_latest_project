const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{type:String,required:true},
    discription:{type:String,required:true},
    category:{type:String,required:true},
    price:{type:Number,required:true},
    img:{type:String, validate:{validator:function(v){return /^(http|https):\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(v)},
                                                message: props => `${props.value} is not a valid image URL!`}
}

})
const Product = mongoose.model('products',productSchema)
module.exports = Product;
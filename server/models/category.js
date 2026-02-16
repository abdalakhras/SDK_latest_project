const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({

    name :{type:String,required:true},
    discription:{type:String,},
    image:{type:String,validate:{validator:function(v){return /^(http|https):\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(v)},
                                                message: props => `${props.value} is not a valid image URL!`}}
})
const Category = mongoose.model('category',categorySchema)
module.exports = Category
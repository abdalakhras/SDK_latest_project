const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['Single', 'Double', 'Suite',], required: true },
  price: { type: Number, required: true },
  capacity: { type: Number, default: 2 },
  view: { type: String, required: true,},
  images: [{
    type: String,
    trim: true,
    match: [
      /^(http|https):\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/,
      '{VALUE} is not a valid image URL!'
    ]
  }],
  status: { type: String, enum: ['Available', 'Booked', 'Maintenance'], default: 'Available' },
  discription:{type:String,required:true},
}, { timestamps: true });

const Rooms = mongoose.model('Room', roomSchema);
module.exports = Rooms
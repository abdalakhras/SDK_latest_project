const Booking = require("../models/booking");

exports.createBooking = async (req, res) => {
  const user = req.Authorized.id;
  const { room, checkIn, checkOut, guests, totalAmount } = req.body;

  try {
    let existingBooking = await Booking.findOne({ room: room });

    //   status: { $in: ['Pending', 'Confirmed', 'CheckedIn'] },
    //   checkIn: { $lt: new Date(checkOut) },
    //   checkOut: { $gt: new Date(checkIn) }

    if (!existingBooking) {
    let booking = await Booking.create({
      room,
      user: user,
      checkIn,
      checkOut,
      guests,
      totalAmount,
    });

    return res.status(200).json({ message: "Booking created successfully", booking });
       
    }else{
        return res.status(400).json({message:"room already booked"})
    }

    //   if (new Date(checkIn) >= new Date(checkOut)) {
    //   return res.status(400).json({message: 'Check-out date must be after check-in date'});
    // }
 
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
     return
  }
};

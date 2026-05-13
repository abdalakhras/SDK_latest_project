const Rooms = require("../models/room");

exports.createRooms = async (req, res) => {
  const roomName = req.body.name;
  const roomType = req.body.type;
  const roomPrice = req.body.price;
  const roomCapacity = req.body.capacity;
  const roomView = req.body.view;
  const roomImg = req.body.images;
  const roomStatus = req.body.status;
  const roomDiscription = req.body.discription;

  try {
    const room = new Rooms({
      name: roomName,
      type: roomType,
      price: roomPrice,
      capacity: roomCapacity,
      view: roomView,
      images: roomImg,
      status: roomStatus,
      discription: roomDiscription,
    });
    await room.save();
    res.status(200).json({ message: "room created succefully", room });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.getRooms = async (req, res) => {
  try {
    const rooms = await Rooms.find();
    res.status(200).json({ message: "rooms fetched successfully", rooms });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.updateRoom = async (req, res) => {
  const { id, name, type, price, capacity, view, images, status, discription } =
    req.body;
  // const roomName = req.body.name
  // const roomType = req.body.type
  // const roomPrice = req.body.price
  // const roomCapacity = req.body.capacity
  // const roomView = req.body.view
  // const roomImg = req.body.image
  // const roomStatus = req.body.status
  // const roomDiscription =req.body.discription

  try {
    const room = await Rooms.findByIdAndUpdate(id, {
      name,
      type,
      price,
      capacity,
      view,
      images,
      status,
      discription,
    });
    if (!room) {
      return res.status(400).json({ message: "no such a room" });
    }

    res.status(200).json({ room, message: "updated succesfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteRoom = async (req, res) => {
  const id = req.params.id;
  try {
    const room = await Rooms.findByIdAndDelete(id);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.findRoomById = async (req, res) => {
  const id = req.params.id;
  try {
    const room = await Rooms.findById(id);
    if (!room) {
      return res.status(400).json({ messsage: "no such room" });
    }
    res.status(200).json({ room, message: "room founded" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

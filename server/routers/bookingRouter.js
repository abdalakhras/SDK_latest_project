const express = require("express");
const userAuth = require("../authMiddleWare/userAuth");
const AdminAuth = require("../authMiddleWare/adminAuth");
const managerAuth = require("../authMiddleWare/managerAuth");
const {
  createBooking,
  getBookings,
  getAllBookings,
  updateBooking,
  deletBooking,
} = require("../controller/bookingController");

const router = express.Router();

router.post("/book", userAuth, createBooking);
router.get("/getbooking", userAuth, getBookings);
router.get("/getallbookings", AdminAuth, getAllBookings);
router.put("/updateBooking", managerAuth, updateBooking);
router.delete("/deleteBooking/:id",AdminAuth,deletBooking)
module.exports = router;

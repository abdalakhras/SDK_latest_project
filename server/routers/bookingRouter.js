const express = require('express')
const userAuth = require('../authMiddleWare/userAuth')
const AdminAuth = require('../authMiddleWare/adminAuth')
const {createBooking,getBookings,getAllBookings} = require("../controller/bookingController")

const router = express.Router()

router.post('/book',userAuth,createBooking)
router.get('/getbooking',userAuth,getBookings)
router.get('/getallbookings',AdminAuth,getAllBookings)

module.exports = router
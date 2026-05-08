const express = require('express')
const userAuth = require('../authMiddleWare/userAuth')
const {createBooking} = require("../controller/bookingController")

const router = express.Router()

router.post('/book',userAuth,createBooking)

module.exports = router
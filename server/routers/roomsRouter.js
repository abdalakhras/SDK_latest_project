const express = require('express')
const adminAuth = require('../authMiddleWare/adminAuth')
const userAuth = require('../authMiddleWare/userAuth')
const managerAuth = require('../authMiddleWare/managerAuth')
const {createRooms,getRooms,updateRoom,deleteRoom,findRoomById} = require('../controller/roomsController')

const router = express.Router()

router.post('/createroom',adminAuth,createRooms)
router.get('/getrooms',getRooms)
router.put('/updateroom',managerAuth,updateRoom)
router.delete('/delroom/:id',adminAuth,deleteRoom)
router.get('/findbyid/:id',findRoomById)


module.exports = router
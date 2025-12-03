const express = require('express')
const { listRooms, getRoomDetail, createRoom, updateRoom, removeRoom, assignAmenitiesToRoom, updateRoomStatus, searchRooms } = require('../controllers/room')
const { authCheck, adminCheck } = require('../middlewares/authMiddleware')
const { upload } = require("../utils/supabase")

const router = express.Router()

// @ENDPOINT http://localhost:5002/api/rooms
router.get('/rooms', listRooms)
router.get('/rooms/:id', getRoomDetail)
router.post('/rooms', authCheck, adminCheck, upload.array("images", 10), createRoom)
router.patch('/rooms/:id', authCheck, adminCheck, upload.array("newImages", 10), updateRoom)
router.patch('/rooms/:id/status', authCheck, adminCheck, updateRoomStatus)
router.delete('/rooms/:id', authCheck, adminCheck, removeRoom)
router.post("/rooms/:id/amenities", authCheck, adminCheck, assignAmenitiesToRoom);
router.post('/rooms/search', searchRooms)

module.exports = router
const express = require("express");
const { authCheck, adminCheck } = require("../middlewares/authMiddleware");
const { getSummary, getBookingStats, getPaymentStats, getRoomStats, getAmenityStats } = require("../controllers/dashboard");


const router = express.Router();

// @ENDPOINT http://localhost:5002/api/dashboard
router.get("/dashboard/summary", authCheck, adminCheck, getSummary);
router.get("/dashboard/bookings", authCheck, adminCheck, getBookingStats);
router.get("/dashboard/payments", authCheck, adminCheck, getPaymentStats);
router.get("/dashboard/rooms", authCheck, adminCheck, getRoomStats);
router.get("/dashboard/amenities", authCheck, adminCheck, getAmenityStats);


module.exports = router;
const express = require("express");
const { authCheck, adminCheck } = require("../middlewares/authMiddleware");
const { createBooking, getBooking, bookingCancel, completeBooking, getAllBookings, bookingDates } = require("../controllers/bookings");

const router = express.Router();

// @ENDPOINT http://localhost:5002/api/bookings
//user
router.post("/bookings", authCheck, createBooking);
router.get("/bookings/me", authCheck, getBooking);
router.patch("/bookings/:id/cancel", authCheck, bookingCancel);
router.get("/bookings/:id/booked-dates", authCheck, bookingDates);

//admin
router.get("/bookings", authCheck, adminCheck, getAllBookings);
router.patch("/bookings/:id/complete", authCheck, adminCheck, completeBooking);

module.exports = router;

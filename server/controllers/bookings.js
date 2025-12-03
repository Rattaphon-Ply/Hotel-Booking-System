const prisma = require("../utils/prisma");

exports.createBooking = async (req, res) => {
  try {
    //code body
    const { roomId, checkIn, checkOut, totalPrice } = req.body;

    // Check have a room?
    const room = await prisma.room.findUnique({
      where: { id: roomId },
    });
    if (!room) {
      return res.status(400).json({ message: "Room not found." });
    }

    // Validate input
    if (!roomId || !checkIn || !checkOut || !totalPrice) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkInDate >= checkOutDate) {
      return res
        .status(400)
        .json({ message: "Check-out must be after check-in." });
    }

    // Check room availability
    const existingBooking = await prisma.booking.findFirst({
      where: {
        roomId,
        status: { in: ["PENDING", "CONFIRMED"] }, // <-- เฉพาะที่ยัง active
        OR: [
          { checkIn: { lte: checkOutDate }, checkOut: { gte: checkInDate } },
        ],
      },
    });

    if (existingBooking) {
      return res
        .status(400)
        .json({ message: "Room is already booked for these dates." });
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        userId: req.user.id,
        roomId,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        totalPrice,
      },
    });

    res
      .status(201)
      .json({ message: "The room reservation was successful.", booking });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getBooking = async (req, res) => {
  try {
    //code body
    const bookings = await prisma.booking.findMany({
      where: { userId: req.user.id },
      include: { room: true, payment: true },
      orderBy: { updatedAt: "desc" },
    });
    res.json(bookings);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: { room: true, user: true, payment: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.bookingCancel = async (req, res) => {
  try {
    const bookingId = parseInt(req.params.id);
    const { action } = req.body; // "pay" หรือ "cancel"

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });
    if (!booking)
      return res.status(404).json({ message: "Booking not found." });

    if (action !== "cancel") {
      return res
        .status(400)
        .json({ message: "Invalid action. Only cancel is allowed." });
    }

    if (booking.status === "CANCELLED") {
      return res.status(400).json({ message: "Booking is already cancelled." });
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status: "CANCELLED" },
    });

    res.json({
      message: "Booking cancelled successfully.",
      booking: updatedBooking,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.completeBooking = async (req, res) => {
  try {
    const bookingId = parseInt(req.params.id);

    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status: "COMPLETED" },
    });

    res.json({ message: "Update Complete success", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error completing booking." });
  }
};

exports.bookingDates = async (req, res) => {
  try {
    const roomId = parseInt(req.params.id);

    const bookings = await prisma.booking.findMany({
      where: { roomId: roomId },
      select: { checkIn: true, checkOut: true },
    });

    let dates = [];

    bookings.forEach((b) => {
      let current = new Date(b.checkIn);
      let end = new Date(b.checkOut);

      while (current <= end) {
        dates.push(current.toISOString().split("T")[0]);
        current.setDate(current.getDate() + 1);
      }
    });

    res.json(dates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

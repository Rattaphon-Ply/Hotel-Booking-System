const prisma = require("../utils/prisma");

exports.getSummary = async (req, res) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalRooms = await prisma.room.count();
    const availableRooms = await prisma.room.count({
      where: { status: "AVAILABLE" },
    });
    const totalBookings = await prisma.booking.count();
    const completedBookings = await prisma.booking.count({
      where: { status: "COMPLETED" },
    });

    const revenue = await prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: "SUCCESS" },
    });

    res.json({
      totalUsers,
      totalRooms,
      availableRooms,
      totalBookings,
      completedBookings,
      totalRevenue: revenue._sum.amount || 0,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getBookingStats = async (req, res) => {
  try {
    const bookings = await prisma.booking.groupBy({
      by: ["status"],
      _count: { status: true },
    });

    res.json(bookings); // [{ status: 'PENDING', _count: { status: 5 } }, ...]
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getPaymentStats = async (req, res) => {
  try {
    const payments = await prisma.payment.groupBy({
      by: ["method", "status"],
      _count: { id: true },
      _sum: { amount: true },
    });

    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getRoomStats = async (req, res) => {
  try {
    const rooms = await prisma.room.findMany({
      include: { bookings: true },
    });

    const occupancyRates = rooms.map((room) => {
      const totalBookings = room.bookings.length;
      const completedBookings = room.bookings.filter(
        (b) => b.status === "COMPLETED"
      ).length;
      const occupancyRate =
        totalBookings > 0 ? (completedBookings / totalBookings) * 100 : 0;

      return {
        roomId: room.id,
        roomName: room.name,
        occupancyRate: occupancyRate.toFixed(2) + "%",
      };
    });

    res.json(occupancyRates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAmenityStats = async (req, res) => {
  try {
    const amenities = await prisma.amenity.findMany({
      include: { rooms: true },
    });

    const stats = amenities.map((a) => ({
      amenityId: a.id,
      name: a.name,
      roomCount: a.rooms.length,
    }));

    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

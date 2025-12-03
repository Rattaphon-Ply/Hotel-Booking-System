const prisma = require("../utils/prisma");

// สร้างการชำระเงิน (จำลอง)
exports.createPayment = async (req, res) => {
  try {
    const { bookingId, method, amount, transactionId } = req.body;

    // ตรวจสอบว่ามี booking นี้จริงไหม
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    // ตรวจสอบว่าจ่ายไปแล้วหรือยัง
    const existingPayment = await prisma.payment.findUnique({
      where: { bookingId },
    });
    if (existingPayment) {
      return res
        .status(400)
        .json({ message: "Payment already exists for this booking." });
    }

    // สร้างการชำระเงินจำลอง
    const payment = await prisma.payment.create({
      data: {
        bookingId,
        method, // "CASH" | "PROMPTPAY" | "CREDIT_CARD" | "BANK_TRANSFER"
        amount,
        transactionId: transactionId || `TXN-${Date.now()}`,
        status: "SUCCESS", // จำลองให้สำเร็จเลย
      },
    });

    // อัปเดตสถานะ Booking → CONFIRMED
    await prisma.booking.update({
      where: { id: bookingId },
      data: { status: "CONFIRMED" },
    });

    res.json({
      message: "Payment successful and booking confirmed.",
      payment,
    });
  } catch (err) {
    console.error("Error creating payment:", err);
    res
      .status(500)
      .json({
        message: "Server error while creating payment.",
        error: err.message,
      });
  }
};

exports.getPaymentDetail = async (req, res) => {
  try {
    const paymentId = parseInt(req.params.id);
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: {
        booking: {
          include: { room: true, user: { select: { name: true, email: true } } },
        },
      },
    });
    if (!payment) {
      return res.status(404).json({ message: "Payment not found." });
    }
    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch payment detail.", error: err.message });
  }
};

exports.listPayments = async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        booking: {
          include: { user: { select: { name: true, email: true } }, room: true },
        },
      },
    });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: "Failed to list payments.", error: err.message });
  }
};
const express = require("express");
const { authCheck, adminCheck } = require("../middlewares/authMiddleware");
const { listPayments, getPaymentDetail, createPayment } = require("../controllers/payments");

const router = express.Router();

// @ENDPOINT http://localhost:5002/api/payments
//ADMIN
router.get("/payments", authCheck, adminCheck, listPayments);

//USER
router.post("/payments", authCheck, createPayment);
router.get("/payments/:id", authCheck, getPaymentDetail);

module.exports = router;
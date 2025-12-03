const express = require("express");
const { authCheck, adminCheck } = require("../middlewares/authMiddleware");
const { createAmenities, listAmenities, updateAmenity, deleteAmenity } = require("../controllers/amenities");

const router = express.Router();

// @ENDPOINT http://localhost:5002/api/amenities
//ADMIN
router.post("/amenities", authCheck, adminCheck, createAmenities);
router.patch("/amenities/:id", authCheck, adminCheck, updateAmenity);
router.delete("/amenities/:id", authCheck, adminCheck, deleteAmenity);
router.get("/amenities", authCheck, adminCheck, listAmenities);

module.exports = router;
const express = require("express");
const { authCheck, adminCheck } = require("../middlewares/authMiddleware");
const { listUsers, changeRole, changeProfileUser, deleteUser, changePassword, getProfile } = require("../controllers/user");

const router = express.Router();

// @ENDPOINT http://localhost:5002/api/users
//ADMIN
router.get("/users", authCheck, adminCheck, listUsers);
router.patch("/users/:id/role", authCheck, adminCheck, changeRole);
router.delete("/users/:id", authCheck, adminCheck, deleteUser);
//USER
router.get("/users/profile",authCheck, getProfile)
router.patch("/users/profile", authCheck, changeProfileUser);
router.patch("/users/change-password", authCheck, changePassword);

module.exports = router;
const prisma = require("../utils/prisma");
const bcrypt = require("bcryptjs");

exports.listUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { deletedAt: null }, 
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        updatedAt: true,
      },
    });

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.changeRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const validRoles = ["USER", "ADMIN"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    if (!existingUser)
      return res.status(404).json({ message: "User not found" });

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { role: role },
    });

    res.json({ message: "Role updated successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.changeProfileUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, phone } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Name is required" });
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { name: name, phone: phone },
    });

    const { password, ...safeUser } = user;
    res.json({ message: "Profile updated successfully", user: safeUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Both passwords are required" });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match)
      return res.status(400).json({ message: "Old password incorrect" });

    if (oldPassword === newPassword) {
      return res
        .status(400)
        .json({ message: "New password must be different" });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "New password must be at least 6 characters" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashed },
    });

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser || existingUser.deletedAt) {
      return res.status(404).json({ message: "User not found" });
    }

    // ป้องกันลบ admin
    if (existingUser.role === "ADMIN") {
      return res.status(400).json({ message: "Cannot delete admin user" });
    }

    await prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

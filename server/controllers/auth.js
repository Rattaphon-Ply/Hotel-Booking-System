const prisma = require("../utils/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    //code body
    const { name, email, password, phone } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email and password are required" });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
      return res.status(400).json({ message: "Email already registered" });

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashed, phone },
    });

    res.json({ message: "Registered successfully", newUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    //code body
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    //ตรวจว่า email or password ถูกต้องหรือไม่
    if (!user) return res.status(404).json({ message: "User not found" });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Password Invalid" });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ message: "Login successfully", token, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.currentUser = async (req, res) => {
  try {
    //code body
    const user = await prisma.user.findUnique({
      where: { email: req.user.email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

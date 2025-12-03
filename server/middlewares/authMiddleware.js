const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma");

exports.authCheck = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: "No token provided" });

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

exports.adminCheck = async (req, res, next) => {
  try {
    const { email } = req.user;
    const adminUser = await prisma.user.findFirst({
      where: { email: email },
    });

    if (!adminUser || adminUser.role !== "ADMIN") {
      return res.status(403).json({ message: "Access Denied: Admin only" });
    }

    // console.log(adminUser)
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Admin access denied" });
  }
};

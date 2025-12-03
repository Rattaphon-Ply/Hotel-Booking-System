const prisma = require("../utils/prisma");

exports.createAmenities = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: "Name is required." });

    const existing = await prisma.amenity.findFirst({ where: { name } });
    if (existing)
      return res.status(400).json({ message: "Amenity already exists" });

    const amenities = await prisma.amenity.create({
      data: { name },
    });

    res
      .status(201)
      .json({ message: "Amenity created successfully.", amenities });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.listAmenities = async (req, res) => {
  try {
    const amenities = await prisma.amenity.findMany({
      orderBy: { id: "asc" },
    });
    res.json(amenities);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch amenities." });
  }
};

exports.updateAmenity = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: "Name is required." });

    const existing = await prisma.amenity.findFirst({ where: { name } });
    if (existing)
      return res.status(400).json({ message: "Amenity already exists" });

    const amenity = await prisma.amenity.update({
      where: { id },
      data: { name },
    });

    res.json({
      message: "Amenity updated successfully.",
      amenity,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteAmenity = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.amenity.delete({
      where: { id },
    });

    res.json({ message: "Amenity deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

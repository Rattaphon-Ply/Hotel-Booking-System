const prisma = require("../utils/prisma");
const {
  uploadToSupabase,
  deleteFromSupabase,
  extractPathFromPublicUrl,
} = require("../utils/supabase");

exports.listRooms = async (req, res) => {
  try {
    //code body
    const rooms = await prisma.room.findMany({
      include: { images: true, amenities: { include: { amenity: true } } },
      orderBy: {
        updatedAt: "desc", // เรียงจากใหม่ไปเก่า
      },
    });

    res.json(rooms);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getRoomDetail = async (req, res) => {
  try {
    //code body
    const room = await prisma.room.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { images: true, amenities: { include: { amenity: true } } },
    });

    if (!room) return res.status(404).json({ message: "Room not found" });

    res.json(room);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createRoom = async (req, res) => {
  try {
    const { name, description, pricePerNight, maxGuests, status } = req.body;

    // Convert types
    const price = parseFloat(pricePerNight);
    const guests = parseInt(maxGuests, 10);

    // Validation
    if (!name || name.trim().length === 0) {
      return res.status(400).json({ message: "Name is required" });
    }

    if (price <= 0) {
      return res
        .status(400)
        .json({ message: "Price must be greater than zero" });
    }

    if (guests <= 0) {
      return res.status(400).json({ message: "Max guests must be at least 1" });
    }

    if (!description || description.trim().length === 0) {
      return res.status(400).json({ message: "Description is required" });
    }

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image is required" });
    }

    // Create Room
    const room = await prisma.room.create({
      data: {
        name,
        description,
        pricePerNight: price,
        maxGuests: guests,
        status,
      },
    });

    const uploadedUrls = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const publicUrl = await uploadToSupabase(file.path, file.filename);
        uploadedUrls.push(publicUrl);

        await prisma.roomImage.create({
          data: {
            roomId: room.id,
            url: publicUrl,
          },
        });
      }
    }

    res.json({
      message: "Create Room Successfully",
      room,
      images: uploadedUrls,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateRoom = async (req, res) => {
  try {
    //code body
    const roomId = parseInt(req.params.id, 10);
    if (isNaN(roomId))
      return res.status(400).json({ message: "Invalid room ID" });

    

    // ✅ 1. Update ข้อมูลห้อง
    const data = {};
    const fields = ["name", "description", "pricePerNight", "maxGuests"];
    for (const key of fields) {
      if (req.body[key] !== undefined && req.body[key] !== null) {
        if (key === "pricePerNight") data[key] = parseFloat(req.body[key]);
        else if (key === "maxGuests") data[key] = parseInt(req.body[key]);
        else data[key] = req.body[key];
      }
    }

    const room = await prisma.room.update({
      where: { id: roomId },
      data,
    });

    // ✅ 2. ลบรูปที่ถูกเลือก
    const { deleteImageIds } = req.body;
    if (deleteImageIds) {
      const ids =
        typeof deleteImageIds === "string"
          ? JSON.parse(deleteImageIds)
          : deleteImageIds;

      if (Array.isArray(ids) && ids.length > 0) {
        const oldImages = await prisma.roomImage.findMany({
          where: { id: { in: ids.map(Number) } },
        });

        // ลบออกจาก Supabase
        for (const img of oldImages) {
          const path = extractPathFromPublicUrl(img.url);
          if (path) {
            try {
              await deleteFromSupabase(path);
            } catch (err) {
              console.warn("Error deleting:", err.message);
            }
          }
        }

        // ลบออกจาก DB
        await prisma.roomImage.deleteMany({
          where: { id: { in: ids.map(Number) } },
        });
      }
    }

    // ✅ 3. อัปโหลดรูปใหม่
    const uploadedUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const publicUrl = await uploadToSupabase(file.path, file.filename);
        uploadedUrls.push(publicUrl);

        await prisma.roomImage.create({
          data: { roomId, url: publicUrl },
        });
      }
    }

    res.json({
      message: "Room updated successfully",
      room,
      addedImages: uploadedUrls,
      deletedImages: deleteImageIds || [],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error, Failed to update room" });
  }
};

exports.updateRoomStatus = async (req, res) => {
  try {
    const roomId = parseInt(req.params.id, 10);
    const { status } = req.body;

    if (isNaN(roomId))
      return res.status(400).json({ message: "Invalid room ID" });
    if (!status) return res.status(400).json({ message: "Status is required" });

    // ตรวจสอบว่า status ถูกต้องตาม enum ที่ Prisma ใช้
    const validStatuses = ["AVAILABLE", "UNAVAILABLE", "MAINTENANCE"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const room = await prisma.room.update({
      where: { id: roomId },
      data: { status },
    });

    res.json({ message: "Room status updated successfully", room });
  } catch (error) {}
};

exports.removeRoom = async (req, res) => {
  try {
    //code body
    const roomId = parseInt(req.params.id);
    if (isNaN(roomId))
      return res.status(400).json({ message: "Invalid room ID" });

    const room = await prisma.room.findUnique({
      where: { id: roomId },
      include: { images: true }, // เอารูปทั้งหมด
    });

    if (!room) return res.status(404).json({ message: "Room not found" });

    // 1. ลบรูปทั้งหมดจาก Supabase
    for (const img of room.images) {
      const path = extractPathFromPublicUrl(img.url);
      if (path) {
        try {
          await deleteFromSupabase(path);
        } catch (err) {
          console.warn("Failed to delete image:", img.url, err.message);
        }
      }
    }

    // 2. ลบ record รูปทั้งหมดจาก DB
    await prisma.roomImage.deleteMany({
      where: { roomId },
    });

    // 3. ลบห้อง
    await prisma.room.delete({ where: { id: roomId } });

    res.json({ message: "Deleted Room Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ผูก amenities เข้ากับห้อง (เช่น [1,2,3])
exports.assignAmenitiesToRoom = async (req, res) => {
  try {
    const roomId = parseInt(req.params.id);
    const { amenityIds } = req.body; // [1, 2, 3]

    // ลบของเก่าก่อน (ถ้ามี)
    await prisma.roomAmenity.deleteMany({ where: { roomId } });

    // เพิ่มใหม่ทั้งหมด
    const data = amenityIds.map((amenityId) => ({ roomId, amenityId }));
    await prisma.roomAmenity.createMany({ data });

    await prisma.room.update({
      where: { id: roomId },
      data: { updatedAt: new Date() },
    });

    res.json({ message: "Amenities assigned successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to assign amenities." });
  }
};

exports.searchRooms = async (req, res) => {
  try {
    let { query, price, start, end, sort = "asc" } = req.body;
    const where = {};

    // Search by name or description
    if (query && typeof query === "string") {
      where.OR = [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ];
    }

    // Filter by pricePerNight
    if (Array.isArray(price) && price.length === 2) {
      const min = Number(price[0]);
      const max = Number(price[1]);
      if (!isNaN(min) && !isNaN(max)) {
        where.pricePerNight = { gte: min, lte: max };
      }
    }

    // Filter by availability dates
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      if (!isNaN(startDate) && !isNaN(endDate)) {
        // ห้องที่ไม่มี booking ในช่วงที่เลือก
        where.bookings = {
          none: {
            OR: [
              {
                checkIn: { lte: endDate },
                checkOut: { gte: startDate },
              },
            ],
          },
        };
      }
    }

    // ดึงข้อมูลจาก DB
    const rooms = await prisma.room.findMany({
      where,
      orderBy: {
        pricePerNight: sort.toLowerCase() === "asc" ? "asc" : "desc",
      },
      include: {
        bookings: true, // แสดง booking info
        amenities: true, // แสดง amenities
        images: true, // แสดง images
      },
    });

    res.json({ success: true, rooms });
  } catch (err) {
    console.error("Error in searchRooms:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

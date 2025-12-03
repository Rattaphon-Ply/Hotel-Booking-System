const multer = require("multer");
const { createClient } = require("@supabase/supabase-js");
const path = require("path");
const fs = require("fs");

const bucket_name = "Rooms-Bucket";
const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_KEY;

// Create Supabase client
const supabase = createClient(url, key);

// ใช้ multer รับไฟล์จาก form-data
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const tempDir = path.join(__dirname, "../../temp");
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ฟังก์ชันอัปโหลดไฟล์ไปยัง Supabase
async function uploadToSupabase(localPath, filename) {
  const fileBuffer = fs.readFileSync(localPath);

  const { data, error } = await supabase.storage
    .from(bucket_name)
    .upload(filename, fileBuffer, {
      cacheControl: "3600",
      upsert: false,
      contentType: "image/jpeg",
    });

  if (error) throw error;

  // ลบไฟล์ local ชั่วคราว
  fs.unlinkSync(localPath);

  // ดึง public URL
  const { data: publicData } = supabase.storage
    .from(bucket_name)
    .getPublicUrl(filename);

  return publicData.publicUrl;
}

async function deleteFromSupabase(filename) {
  try {
    const { data, error } = await supabase.storage
      .from(bucket_name)
      .remove([filename]);

    if (error) throw error;
    return data;
  } catch (err) {
    throw err;
  }
}

function extractPathFromPublicUrl(publicUrl) {
  if (!publicUrl) return null;
  try {
    const u = new URL(publicUrl);
    // path เช่น /storage/v1/object/public/<bucket>/<objectKey>
    const parts = u.pathname.split("/").filter(Boolean);
    // หา index ของ 'object' หรือ 'public' แล้วเอาส่วนที่เหลือเป็น objectKey
    const objIndex = parts.findIndex((p) => p === "object");
    if (objIndex >= 0) {
      // expect: ["storage","v1","object","public","<bucket>","<objectKeyParts...>"]
      const objectKeyParts = parts.slice(objIndex + 2); // skip "object","public"
      // first part is bucket, remove it
      objectKeyParts.shift();
      return objectKeyParts.join("/");
    }
    // ถ้าไม่ใช่รูปแบบเดียวกัน ให้ fallback เอาชื่อไฟล์ท้ายสุด
    const last = parts[parts.length - 1];
    return last;
  } catch (err) {
    return null;
  }
}

function getContentTypeFromName(name) {
  const ext = path.extname(name || "").toLowerCase();
  if (!ext) return null;
  if ([".jpg", ".jpeg"].includes(ext)) return "image/jpeg";
  if ([".png"].includes(ext)) return "image/png";
  if ([".webp"].includes(ext)) return "image/webp";
  return null;
}

module.exports = {
  upload,
  uploadToSupabase,
  deleteFromSupabase,
  extractPathFromPublicUrl,
  getContentTypeFromName,
};

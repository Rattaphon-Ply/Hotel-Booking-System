import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useStore from "@/store/store";
import { useEffect } from "react";
import { motion } from "motion/react";
import LoadingScreen from "../LoadingScreen";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const DetailCard = ({ id }) => {
  const getRoomDetail = useStore((s) => s.getRoomDetail);
  const room = useStore((s) => s.roomDetail);

  useEffect(() => {
    getRoomDetail(id);
  }, [id]);

  if (room === null) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <LoadingScreen />
      </div>
    );
  }

  if (!room) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-2xl font-bold mb-4">ไม่พบห้องนี้</h1>
        <Link to="/rooms">
          <Button>กลับไปหน้าห้องทั้งหมด</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6 sm:p-10 min-h-screen bg-gradient-to-b from-green-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xl bg-white shadow-2xl rounded-3xl overflow-hidden"
      >
        {/* รูปภาพห้อง */}
        <div className="relative">
          {room.images?.length ? (
            <motion.img
              whileHover={{ scale: 1.03 }}
              src={room.images?.[0]?.url}
              alt={room.name}
              className="w-full h-[280px] object-cover"
            />
          ) : (
            <div className="w-full h-[280px] bg-gray-200 flex items-center justify-center text-gray-500">
              ไม่มีรูปภาพ
            </div>
          )}
          <Badge
            className={`absolute top-4 left-4 text-white px-3 py-1 rounded-full ${
              room.status === "AVAILABLE"
                ? "bg-green-500"
                : room.status === "BOOKED"
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          >
            {room.status}
          </Badge>
        </div>

        {/* รายละเอียดห้อง */}
        <div className="p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            {room.name}
          </h1>
          <p className="text-gray-700 leading-relaxed mb-4 break-words">
            {room.description || "ไม่มีรายละเอียดเพิ่มเติม"}
          </p>

          <Separator className="my-4" />

          {/* สิ่งอำนวยความสะดวก */}
          {room.amenities?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-green-700 mb-2">
                สิ่งอำนวยความสะดวก
              </h2>
              <div className="flex flex-wrap gap-2">
                {room.amenities.map((item) => (
                  <Badge key={item.id} variant="secondary">
                    {item.amenity.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* ราคาและปุ่มจอง */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-6">
            <div className="text-center sm:text-left">
              <p className="text-gray-500 text-sm">ราคาต่อคืน</p>
              <p className="text-3xl font-bold text-green-600">
                {room.pricePerNight.toLocaleString()} ฿
              </p>
            </div>

            <Link
              to={
                room.status === "AVAILABLE" ? `/user/booking/${room.id}` : "#"
              }
              state={{ room }}
            >
              <Button
                size="lg"
                disabled={room.status !== "AVAILABLE"}
                className={`w-full sm:w-auto ${
                  room.status !== "AVAILABLE"
                    ? "bg-gray-300 text-gray-500 hover:bg-gray-300 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }`}
              >
                {room.status === "AVAILABLE" ? "จองห้องนี้" : "ไม่พร้อมให้จอง"}
              </Button>
            </Link>
          </div>

          {/* ปุ่มกลับ */}
          <div className="mt-8 text-center">
            <Link to="/rooms">
              <Button
                variant="outline"
                className="border-green-500 text-green-600 hover:bg-green-50"
              >
                ← กลับไปหน้ารวม
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DetailCard;

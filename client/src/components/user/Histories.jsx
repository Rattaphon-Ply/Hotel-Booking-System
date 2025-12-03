import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "motion/react";
import useStore from "@/store/store";
import { canceledBooking, getMyBooking } from "@/api/bookings";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import DialogPayment from "../payment/DialogPayment";
import DialogDetail from "../payment/DialogDetail";

const dotVariants = {
  initial: { y: 0, opacity: 0.4 },
  animate: (i) => ({
    y: [0, -6, 0],
    opacity: [0.4, 1, 0.4],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: "easeInOut",
      delay: i * 0.15, // ทำให้แต่ละ dot ขยับสลับกัน
    },
  }),
};

const Histories = () => {
  const token = useStore((s) => s.token);

  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleGetMyBookings(token);
  }, []);

  const handleGetMyBookings = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const res = await getMyBooking(token);
      const sorted = res.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
      setBookings(sorted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "CONFIRMED":
        return "bg-blue-100 text-blue-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleCancel = async (bookingId) => {
    try {
      await canceledBooking(token, bookingId);

      handleGetMyBookings();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-row items-center justify-center min-h-[80vh] gap-x-3">
        <p className="text-2xl text-emerald-700">กำลังโหลด</p>
        <motion.div animate="pulse" className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              custom={i}
              className="w-3 h-3 rounded-full bg-green-500"
              variants={dotVariants}
              initial="initial"
              animate="animate"
            />
          ))}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-6">
      <h1 className="text-3xl font-bold text-green-600 text-center">
        ประวัติการจองของฉัน
      </h1>

      {bookings.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-green-600 text-2xl py-10"
        >
          ไม่มีประวัติการจอง
        </motion.div>
      ) : (
        <div className="space-y-5">
          {bookings.map((b, index) => (
            <motion.div
              key={b.id || index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {b.room?.name || "ห้องพัก"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    วันที่อัปเดต:{" "}
                    {new Date(b.updatedAt).toLocaleString("th-TH")}
                  </p>
                </div>
                <Badge className={`${getStatusColor(b.status)} text-sm`}>
                  {b.status}
                </Badge>
              </div>

              {/* Table Info */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>เช็คอิน</TableHead>
                    <TableHead>เช็คเอาท์</TableHead>
                    <TableHead className="text-center">ราคาต่อคืน</TableHead>
                    <TableHead className="text-center">รวมทั้งหมด</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {new Date(b.checkIn).toLocaleDateString("th-TH", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      {new Date(b.checkOut).toLocaleDateString("th-TH", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="text-center">
                      {b.room?.pricePerNight?.toLocaleString()} ฿
                    </TableCell>
                    <TableCell className="font-semibold text-center">
                      {b.totalPrice?.toLocaleString()} ฿
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              {/* Action Section */}
              <div className="mt-4 flex justify-end gap-2">
                {b.status === "PENDING" && !b.payment && (
                  <>
                    <DialogPayment
                      booking={b}
                      onSuccess={handleGetMyBookings}
                    />

                    <Button
                      variant="destructive"
                      onClick={() => handleCancel(b.id)}
                    >
                      ยกเลิกการจอง
                    </Button>
                  </>
                )}
              </div>

              {/* Payment Section */}
              {b.payment && (
                <div className="mt-4 border-t pt-3 text-sm text-gray-700 flex justify-between items-center">
                  <div>
                    <p>
                      💳 <span className="font-medium">การชำระเงิน:</span>{" "}
                      {b.payment.status}
                    </p>
                    <p>
                      หมายเลขอ้างอิง:{" "}
                      <span className="text-gray-600">
                        {b.payment.transactionId}
                      </span>
                    </p>
                  </div>
                  {b.status !== "PENDING" && <DialogDetail booking={b} />}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Histories;

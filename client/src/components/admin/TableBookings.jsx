import useStore from "@/store/store";
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
import { Button } from "../ui/button";
import { changeBookingsToCompleted, ListAllBookings } from "@/api/admin";
import { toast } from "sonner";

const TableBookings = () => {
  const token = useStore((s) => s.token);

  const [bookings, setBookings] = useState([]);

  const handleGetBookings = async () => {
    try {
      const res = await ListAllBookings(token);
      setBookings(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleGetBookings();
  }, []);

  const handleCompleteBooking = async (id) => {
    try {
      const res = await changeBookingsToCompleted(token, id);
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: "COMPLETED" } : b))
      );
      toast.success(res.data.message)
      handleGetBookings();
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Booking Management</h2>
      <Table>
        <TableCaption>รายการการจองทั้งหมด</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] text-center">#</TableHead>
            <TableHead>ชื่อผู้จอง</TableHead>
            <TableHead>ห้อง</TableHead>
            <TableHead className="text-center">Check-in</TableHead>
            <TableHead className="text-center">Check-out</TableHead>
            <TableHead className="text-center">สถานะ</TableHead>
            <TableHead className="text-right">ราคารวม</TableHead>
            <TableHead className="text-center">วิธีชำระ</TableHead>
            <TableHead className="text-center">อัปเดตล่าสุด</TableHead>
            <TableHead className="text-center">จัดการ</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {bookings.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell>{item.user?.name}</TableCell>
              <TableCell>{item.room?.name}</TableCell>
              <TableCell className="text-center">
                {formatDate(item.checkIn)}
              </TableCell>
              <TableCell className="text-center">
                {formatDate(item.checkOut)}
              </TableCell>
              <TableCell className="text-center">
                <span
                  className={`px-2 py-1 rounded-full text-sm font-medium ${
                    item.status === "COMPLETED"
                      ? "bg-green-100 text-green-700"
                      : item.status === "CONFIRMED"
                      ? "bg-blue-100 text-blue-700"
                      : item.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                ฿{item.totalPrice?.toLocaleString()}
              </TableCell>
              <TableCell className="text-center">
                {item.payment?.method || "-"}
              </TableCell>
              <TableCell className="text-center">
                {formatDate(item.updatedAt)}
              </TableCell>
              <TableCell className="text-center">
                {item.status === "COMPLETED" ? (
                  <Button size="sm" disabled>
                    Completed
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => handleCompleteBooking(item.id)}
                  >
                    Complete
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default TableBookings;

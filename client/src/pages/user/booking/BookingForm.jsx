import { useLocation, useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createBooking, bookedDates } from "@/api/bookings";
import useStore from "@/store/store";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { roomId } = useParams();
  const room = location.state?.room;
  const token = useStore((s) => s.token);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
  });

  const [unavailableDates, setUnavailableDates] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await bookedDates(token, room.id);
        setUnavailableDates(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [room.id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const nights =
        (new Date(form.checkOut) - new Date(form.checkIn)) /
        (1000 * 60 * 60 * 24);
      const totalPrice = room.pricePerNight * nights;

      const payload = {
        roomId: room.id,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        totalPrice,
      };

      const res = await createBooking(token, payload);
      toast.success(res.data.message)
      navigate("/user/my-booking");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "เกิดข้อผิดพลาดในการจอง");
    }
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  if (!room) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-2xl font-bold mb-4 text-green-800">
          ❌ ไม่พบข้อมูลห้อง ID: {roomId}
        </h1>
        <Link to="/rooms">
          <Button className="bg-green-500 hover:bg-green-600 text-white">
            กลับไปหน้าห้องทั้งหมด
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-10 min-h-screen bg-green-50">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-green-800">
          จองห้อง: {room.name}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name"
            placeholder="ชื่อ-นามสกุล"
            required
            onChange={handleChange}
            className="border-green-300 focus:border-green-500 focus:ring-green-200"
          />
          <Input
            name="email"
            type="email"
            placeholder="อีเมล"
            required
            onChange={handleChange}
            className="border-green-300 focus:border-green-500 focus:ring-green-200"
          />
          <Input
            name="phone"
            type="tel"
            placeholder="เบอร์โทรศัพท์"
            required
            onChange={handleChange}
            className="border-green-300 focus:border-green-500 focus:ring-green-200"
          />

          {/* Calendar CheckIn */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start border-green-400 text-green-700 hover:bg-green-50"
              >
                {form.checkIn ? form.checkIn : "เลือกวันที่เข้าพัก"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 flex justify-center" align="center">
              <Calendar
                mode="single"
                selected={form.checkIn ? new Date(form.checkIn) : undefined}
                onSelect={(date) =>
                  setForm({ ...form, checkIn: formatDate(date) })
                }
                disabled={(date) =>
                  unavailableDates.includes(date.toISOString().split("T")[0])
                }
              />
            </PopoverContent>
          </Popover>

          {/* Calendar CheckOut */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start border-green-400 text-green-700 hover:bg-green-50"
              >
                {form.checkOut ? form.checkOut : "เลือกวันที่ออก"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex justify-center" align="center">
              <Calendar
                mode="single"
                selected={form.checkOut ? new Date(form.checkOut) : undefined}
                onSelect={(date) =>
                  setForm({ ...form, checkOut: formatDate(date) })
                }
                disabled={(date) => {
                  const d = date.toISOString().split("T")[0];
                  if (unavailableDates.includes(d)) return true;
                  if (form.checkIn) {
                    const checkInDate = new Date(form.checkIn);
                    return date < checkInDate;
                  }
                  return false;
                }}
              />
            </PopoverContent>
          </Popover>

          <div className="flex justify-between items-center pt-4">
            <Link to={`/rooms/${room.id}`} state={{ room }}>
              <Button
                variant="outline"
                className="border-green-400 text-green-700 hover:bg-green-50"
              >
                ← ย้อนกลับ
              </Button>
            </Link>
            <Button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              ยืนยันการจอง
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;

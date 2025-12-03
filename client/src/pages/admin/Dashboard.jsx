import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useStore from "@/store/store";
import { getAmenities, getBookings, getPayments, getRooms, getSummary } from "@/api/dashboard";
import SummaryGrid from "@/components/admin/dashboards/Summarygrid";
import BookingStatusChart from "@/components/admin/dashboards/Bookingstatuschart";
import PaymentMethodChart from "@/components/admin/dashboards/Paymentmethodchart";
import RoomOccupancyTable from "@/components/admin/dashboards/Roomoccupancytable";
import AmenityStatsTable from "@/components/admin/dashboards/Amenitystatstable";

const Dashboard = () => {
 const token = useStore((s)=>s.token)

  const [summary, setSummary] = useState({
    totalUsers: 0,
    totalRooms: 0,
    availableRooms: 0,
    totalBookings: 0,
    completedBookings: 0,
    totalRevenue: 0,
  });
  const [bookingStats, setBookingStats] = useState([]);
  const [paymentStats, setPaymentStats] = useState([]);
  const [roomStats, setRoomStats] = useState([]);
  const [amenityStats, setAmenityStats] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const summaryRes = await getSummary(token)
        setSummary(summaryRes.data);

        const bookingRes = await getBookings(token)
        setBookingStats(bookingRes.data);

        const paymentRes = await getPayments(token)
        setPaymentStats(paymentRes.data);

        const roomRes = await getRooms(token)
        setRoomStats(roomRes.data);

        const amenityRes = await getAmenities(token)
        setAmenityStats(amenityRes.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-6"
    >
      <SummaryGrid data={summary} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BookingStatusChart data={bookingStats} />
        <PaymentMethodChart data={paymentStats} />
      </div>

      <RoomOccupancyTable rooms={roomStats} />
      <AmenityStatsTable amenities={amenityStats} />
    </motion.div>
  );
};
export default Dashboard;

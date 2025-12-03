import StatsCard from "./StatsCard";
import { Users, Building2, DoorOpen, CalendarCheck, Wallet } from "lucide-react";

export default function SummaryGrid({ data }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatsCard
        title="Total Users"
        value={data.totalUsers}
        icon={<Users className="w-5 h-5" />}
      />
      <StatsCard
        title="Total Rooms"
        value={data.totalRooms}
        icon={<Building2 className="w-5 h-5" />}
      />
      <StatsCard
        title="Available Rooms"
        value={data.availableRooms}
        icon={<DoorOpen className="w-5 h-5" />}
      />
      <StatsCard
        title="Total Bookings"
        value={data.totalBookings}
        icon={<CalendarCheck className="w-5 h-5" />}
      />
      <StatsCard
        title="Completed Bookings"
        value={data.completedBookings}
        icon={<CalendarCheck className="w-5 h-5" />}
      />
      <StatsCard
        title="Total Revenue"
        value={`฿${data.totalRevenue}`}
        icon={<Wallet className="w-5 h-5" />}
      />
    </div>
  );
}

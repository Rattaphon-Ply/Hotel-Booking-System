import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function BookingStatusChart({ data }) {

  const statusColors = {
    CANCELLED: "#fb7185", // สีแดง
    COMPLETED: "#4ade80", // สีเขียว
    CONFIRMED: "#60a5fa",
    PENDING: "#facc15", 
  };

  const chartData = data.map((item, index) => ({
    name: item.status,
    value: item._count.status,
    color: statusColors[item.status] || "#60a5fa",
  }));

  return (
    <div className="bg-white dark:bg-neutral-900 p-4 rounded-2xl shadow-md border border-neutral-200 dark:border-neutral-800">
      <h2 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-100">
        Booking Status
      </h2>
      <PieChart width={320} height={260}>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={90}
        >
          {chartData.map((entry, index) => (
            <Cell key={index} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

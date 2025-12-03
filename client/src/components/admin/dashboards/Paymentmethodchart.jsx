import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

export default function PaymentMethodChart({ data }) {
  const chartData = data.map((p) => ({
    method: p.method,
    status: p.status,
    count: p._count.id,
  }));

  return (
    <div className="bg-white dark:bg-neutral-900 p-4 rounded-2xl shadow-md border border-neutral-200 dark:border-neutral-800">
      <h2 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-100">
        Payment Methods
      </h2>
      <BarChart width={400} height={280} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="method" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" />
      </BarChart>
    </div>
  );
}

export default function StatsCard({ title, value, icon }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-neutral-900 rounded-2xl shadow-md border border-neutral-200 dark:border-neutral-800">
      <div>
        <h3 className="text-sm text-neutral-500 dark:text-neutral-400">
          {title}
        </h3>
        <p className="text-2xl font-semibold text-neutral-900 dark:text-white mt-1">
          {value}
        </p>
      </div>
      <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
        {icon}
      </div>
    </div>
  );
}

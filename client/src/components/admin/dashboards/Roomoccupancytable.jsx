export default function RoomOccupancyTable({ rooms }) {
  return (
    <div className="bg-white dark:bg-neutral-900 p-4 rounded-2xl shadow-md border border-neutral-200 dark:border-neutral-800 mt-6">
      <h2 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-100">
        Room Occupancy
      </h2>
      <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
        <thead className="bg-neutral-50 dark:bg-neutral-800">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-neutral-500 dark:text-neutral-300">
              Room Name
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-neutral-500 dark:text-neutral-300">
              Occupancy Rate
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {rooms.map((room) => (
            <tr key={room.roomId}>
              <td className="px-4 py-2 text-neutral-700 dark:text-neutral-200">
                {room.roomName}
              </td>
              <td className="px-4 py-2 text-neutral-700 dark:text-neutral-200">
                {room.occupancyRate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

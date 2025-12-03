import RoomsCard from "@/components/card/RoomsCard";
import RoomFilterBar from "@/components/RoomFilterBar";
import useStore from "@/store/store";
import { useEffect } from "react";

const Rooms = () => {
  const getRooms = useStore((s) => s.getRooms);
  const rooms = useStore((s) => s.rooms);
  const loading = useStore((s) => s.loading);

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <div className="flex flex-col gap-2 h-screen overflow-hidden">
      <div>
        <RoomFilterBar />
      </div>
      <div className="p-4 overflow-y-auto">
        <div className="w-full max-w-7xl mx-auto px-4 py-10">
          <h2 className="text-2xl text-center font-bold mb-8 text-gray-700">
            ห้องพักทั้งหมด
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {rooms.map((item, index) => (
              <RoomsCard key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Rooms;

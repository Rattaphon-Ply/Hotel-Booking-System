import { motion } from "motion/react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const RoomsCard = ({ item }) => {
  return (
    <motion.div
      initial={{ scale: 0.98, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      // whileHover={{ scale: 1.03 }}
      transition={{ duration: 1 }}
      className="border rounded-2xl shadow-md hover:shadow-xl bg-white p-4 w-full max-w-[280px] mx-auto transition-all duration-300 cursor-pointer"
    >
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="overflow-hidden rounded-xl"
      >
        {item.images?.length ? (
          <img
            src={item.images[0].url}
            alt={item.name}
            className="w-full h-[180px] object-cover rounded-xl transition-all duration-500"
          />
        ) : (
          <div className="w-full h-[180px] bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
      </motion.div>

      <div className="mt-3 space-y-1">
        <p className="text-lg font-semibold text-gray-800 truncate">{item.name}</p>
        <p className="text-sm text-gray-500 truncate">{item.description}</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span className="text-lg font-bold text-blue-600">
          ฿{item.pricePerNight}
        </span>
        <Link to={`/rooms/${item.id}`} state={{ room: item }}>
          <Button variant="outline" className="rounded-lg px-4 py-1 hover:bg-blue-600 hover:text-white transition">รายละเอียด</Button>
        </Link>
      </div>
    </motion.div>
  );
};
export default RoomsCard;

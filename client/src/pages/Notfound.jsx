import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-7xl font-bold text-green-600 dark:text-green-300"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-4 text-xl text-gray-700 dark:text-gray-300 text-center"
      >
        ไม่พบหน้าที่คุณต้องการ
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-lg transition"
        >
          กลับหน้าหลัก
        </Link>
      </motion.div>
    </div>
  );
};

export default Notfound;

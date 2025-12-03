import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 p-6">
        <div className="max-w-2xl bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 border border-green-200 dark:border-gray-700">
          <h1 className="text-3xl font-bold text-green-600 dark:text-green-300 mb-4">
            About This Project
          </h1>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            เว็บแอปพลิเคชันนี้ถูกพัฒนาขึ้นเพื่อใช้ในการฝึกฝนและเรียนรู้การเขียนโค้ด
            โดยออกแบบเป็นระบบ{" "}
            <span className="font-semibold text-green-600 dark:text-green-300">
              Hotel Booking System
            </span>{" "}
            หรือระบบการจองห้องพักออนไลน์ ภายในโปรเจกต์มีการใช้เทคโนโลยีต่าง ๆ
            เช่น <span className="font-medium">Vite + React</span>,{" "}
            <span className="font-medium">Tailwind CSS</span>,{" "}
            <span className="font-medium">Express.js</span> รวมถึงไลบรารีอื่น ๆ
            เพื่อช่วยให้การพัฒนาเว็บมีประสิทธิภาพมากยิ่งขึ้น
          </p>
        </div>
      </div>
    </motion.div>
  );
};
export default About;

import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const LoadingToRedirect = ({ alreadyRedirected }) => {
  const [count, setCount] = useState(3);
  const [redirect, setRedirect] = useState(alreadyRedirected || false);

  useEffect(() => {
    if (redirect) return; // ถ้า redirect แล้ว ไม่เริ่ม interval ใหม่

    const interval = setInterval(() => {
      setCount((currentCount) => {
        if (currentCount === 1) {
          clearInterval(interval);
          setRedirect(true);
        }
        return currentCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [redirect]);

  if (redirect) {
    return <Navigate to={"/login"} replace />;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="w-full max-w-md shadow-lg border border-gray-200">
          <CardHeader>
            <CardTitle className="text-center text-xl">
              🔒 Please Login successfully.
            </CardTitle>
          </CardHeader>

          <CardContent className="text-center space-y-3 pb-6">
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Loader2 className="animate-spin w-5 h-5" />
              <span>กำลังเปลี่ยนเส้นทาง...</span>
            </div>

            <p className="text-gray-700 font-medium">
              จะพาไปหน้า <span className="text-blue-600">เข้าสู่ระบบ</span>{" "}
              ภายใน
              <span className="font-semibold"> {count} </span> วินาที
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoadingToRedirect;

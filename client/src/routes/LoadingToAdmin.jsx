import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const LoadingToAdmin = () => {
  const [count, setCount] = useState(3);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => {
        if (c === 1) {
          clearInterval(interval);
          setRedirect(true);
        }
        return c - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (redirect) return <Navigate to="/" />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <Card className="w-full max-w-md shadow-lg border border-gray-200">
          <CardHeader>
            <CardTitle className="text-center text-xl">
              🔐 Access Restricted
            </CardTitle>
          </CardHeader>

          <CardContent className="text-center space-y-3 pb-6">
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Loader2 className="animate-spin w-5 h-5" />
              <span>Redirecting...</span>
            </div>

            <p className="text-gray-700 font-medium">
              You will be redirected to{" "}
              <span className="text-blue-600">HOME</span> in
              <span className="font-semibold"> {count} </span> seconds.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoadingToAdmin;

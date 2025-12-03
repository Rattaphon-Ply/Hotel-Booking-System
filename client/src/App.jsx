import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "@/components/ui/sonner";
import useStore from "./store/store";
import { useEffect } from "react";

const App = () => {
  const token = useStore((s) => s.token);
  const user = useStore((s) => s.user);

  useEffect(() => {
    if (!token && user) {
      useStore.getState().logout();
    }
  }, []);
  return (
    <div className="bg-green-50">
      <AppRoutes />
      <Toaster position="top-right" expand={false} richColors />
    </div>
  );
};
export default App;

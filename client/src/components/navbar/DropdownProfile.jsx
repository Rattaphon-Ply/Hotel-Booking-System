import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import LoadingScreen from "../LoadingScreen";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useStore from "@/store/store";
import { toast } from "sonner";



const DropdownProfile = () => {
  const navigate = useNavigate();

  const user = useStore((s) => s.user);
  const logout = useStore((s) => s.logout);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      logout();
      await new Promise((resolve) => setTimeout(resolve, 800));
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.warning("Logout failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <LoadingScreen />}
      {user ? (
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger className="flex gap-2 items-center focus-visible:outline-none">
            <img
              className="w-8 h-8"
              src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-icon-download-in-svg-png-gif-file-formats--user-hacker-avatars-flat-icons-pack-people-456327.png?f=webp&w=512"
            />
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div
                  key="up"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronUp />
                </motion.div>
              ) : (
                <motion.div
                  key="down"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown />
                </motion.div>
              )}
            </AnimatePresence>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator /> {/* ขีดเส้น */}
            <DropdownMenuItem asChild>
              <Link to="/user">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/user/my-booking">History</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex items-center">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "px-3 py-2 bg-white text-green-600 text-sm font-medium hover:bg-gray-100 rounded-md"
                : "px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:text-green-600 transition duration-300"
            }
            to={"/login"}
          >
            Login
          </NavLink>
        </div>
      )}
    </div>
  );
};
export default DropdownProfile;

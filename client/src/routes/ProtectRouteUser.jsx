import { useEffect, useState } from "react";
import LoadingToRedirect from "./LoadingToRedirect";
import useStore from "@/store/store";
import { currentUser } from "@/api/auth";

const ProtectRouteUser = ({ element }) => {
  const [ok, setOk] = useState(false);

  const user = useStore((s) => s.user);
  const token = useStore((s) => s.token);
  const logout = useStore((s) => s.logout);

  useEffect(() => {
    if (token) {
      currentUser(token)
        .then(() => setOk(true))
        .catch((err) => {
          if (err?.response?.status === 401) {
            logout(); // ⭐ สำคัญที่สุด
          }
          setOk(false);
        });
    } else {
      setOk(false);
    }
  }, [token]); // ⭐ ให้เช็คใหม่ทุกครั้งที่ token เปลี่ยน

  if (!ok) return <LoadingToRedirect />;
  return element;
};

export default ProtectRouteUser;

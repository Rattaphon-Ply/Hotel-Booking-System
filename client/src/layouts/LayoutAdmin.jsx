import SidebarAdmin from "@/components/admin/SidebarAdmin";
import { Outlet } from "react-router-dom";

const LayoutAdmin = () => {
  return (
    <div className="">
      <SidebarAdmin />
    </div>
  );
};

export default LayoutAdmin;

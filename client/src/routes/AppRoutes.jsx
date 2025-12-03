import Layout from "@/layouts/Layout";
import LayoutAdmin from "@/layouts/LayoutAdmin";
import About from "@/pages/About";
import Dashboard from "@/pages/admin/Dashboard";
import ManageAmenities from "@/pages/admin/ManageAmenities";
import ManageBookings from "@/pages/admin/ManageBookings";
import ManageRooms from "@/pages/admin/ManageRooms";
import ManageUsers from "@/pages/admin/ManageUsers";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Home from "@/pages/Home";
import Notfound from "@/pages/Notfound";
import RoomDetail from "@/pages/rooms/RoomDetail";
import Rooms from "@/pages/rooms/Rooms";
import BookingForm from "@/pages/user/booking/BookingForm";
import Mybookings from "@/pages/user/booking/Mybookings";
import Payment from "@/pages/user/booking/Payment";
import Profile from "@/pages/user/profile/Profile";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectRouteAdmin from "./ProtectRouteAdmin";
import ProtectRouteUser from "./ProtectRouteUser";
import ListPayments from "@/pages/admin/ListPayments";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "rooms", element: <Rooms /> },
      { path: "rooms/:id", element: <RoomDetail /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "about", element: <About /> },
    ],
  },

  {
    path: "/admin",
    element: <ProtectRouteAdmin element={<LayoutAdmin />} />, //เดี๋ยวจะทำตัว ProtectRouteAdmin แบบนี้ <ProtectRouteAdmin element={<LayoutAdmin />} />
    children: [
      { index: true, element: <Dashboard /> },
      { path: "bookings", element: <ManageBookings /> },
      { path: "rooms", element: <ManageRooms /> },
      { path: "users", element: <ManageUsers /> },
      { path: "amenities", element: <ManageAmenities /> },
      { path: "payments", element: <ListPayments /> },
    ],
  },

  {
    path: "/user",
    element: <ProtectRouteUser element={<Layout />} />, //เดี๋ยวจะทำตัว ProtectRouteUser แบบนี้ <ProtectRouteUser element={<LayoutUser />} />
    children: [
      { index: true, element: <Profile /> },
      { path: "booking/:roomId", element: <BookingForm /> },
      { path: "my-booking", element: <Mybookings /> },
      { path: "payment/:bookingId", element: <Payment /> },
    ],
  },

  {
    path: "*",
    element: <Notfound />,
  },
]);

const AppRoutes = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};
export default AppRoutes;

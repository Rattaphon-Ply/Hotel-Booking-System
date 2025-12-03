"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconBed,
  IconBrandTabler,
  IconClipboardList,
  IconCreditCard,
  IconLogout,
  IconUserCircle,
  IconUsers,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Outlet, useNavigate } from "react-router-dom";
import { Home, Wrench } from "lucide-react";
import useStore from "@/store/store";
import LoadingScreen from "../LoadingScreen";
import { toast } from "sonner";

const SidebarAdmin = () => {
  const navigate = useNavigate();
  const logout = useStore((s) => s.logout);
  const user = useStore((s) => s.user);

  const links = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Manage Bookings",
      href: "/admin/bookings",
      icon: (
        <IconClipboardList className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Manage Rooms",
      href: "/admin/rooms",
      icon: (
        <IconBed className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Manage Amenities",
      href: "/admin/amenities",
      icon: (
        <Wrench className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Manage Users",
      href: "/admin/users",
      icon: (
        <IconUsers className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "List Payments",
      href: "/admin/payments",
      icon: (
        <IconCreditCard className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Go Home",
      href: "/",
      icon: (
        <Home className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
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
    <div
      className={cn(
        "flex w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-screen"
      )}
    >
      {loading && <LoadingScreen />}
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <SidebarLink
                link={{
                  label: "Logout",
                  icon: (
                    <IconLogout className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
                  ),
                  onClick: () => {
                    handleLogout();
                  },
                }}
                className="cursor-pointer"
              />
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: user?.name ?? "No Name",
                icon: (
                  <IconUserCircle className="h-7 w-7 shrink-0 text-neutral-700 dark:text-neutral-200" />
                ),
              }}
              className="font-semibold"
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-neutral-950">
        <Outlet />
      </main>
    </div>
  );
};
export default SidebarAdmin;

export const Logo = () => {
  return (
    <a
      href="/admin"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        Admin Panel
      </motion.span>
    </a>
  );
};
export const LogoIcon = () => {
  return (
    <a
      href="/admin"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </a>
  );
};

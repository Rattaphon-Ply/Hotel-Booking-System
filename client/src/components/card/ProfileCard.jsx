import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  changePasswordUser,
  changeProfileUser,
  getProfileUser,
} from "@/api/user";
import useStore from "@/store/store";
import { toast } from "sonner";

const ProfileCard = () => {
  const token = useStore((s) => s.token);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const getProfile = async () => {
    try {
      const res = await getProfileUser(token);
      setUser(res.data);
      setName(res.data.name);
      setPhone(res.data.phone);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile(token);
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const data = { name, phone }; // มาจาก state
      const res = await changeProfileUser(token, data);
      setUser(res.data.user);
      console.log(res.data);
      toast.success(res.data.message);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update profile");
    }
  };

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      toast.warning("Please fill in both fields");
      return;
    }

    if (newPassword.length < 6) {
      toast.warning("New password must be at least 6 characters");
      return;
    }

    try {
      const password = { oldPassword, newPassword };
      const res = await changePasswordUser(token, password);
      toast.success(res.data.message);
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update Password");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <motion.div
      className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl text-green-600 font-bold mb-4">Profile</h1>

      <Tabs defaultValue="info">
        <TabsList className="mb-4 bg-emerald-600 p-1 rounded-lg gap-2">
          <TabsTrigger
            value="info"
            className="transition-all duration-300 data-[state=active]:bg-white data-[state=active]:text-emerald-600 rounded-md"
          >
            Profile Info
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="transition-all duration-300 data-[state=active]:bg-white data-[state=active]:text-emerald-600 rounded-md"
          >
            Change Password
          </TabsTrigger>
        </TabsList>

        {/* Profile Info */}
        <TabsContent value="info">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="border-green-300
                focus:border-green-600
                  focus-visible:ring-2
                focus-visible:ring-green-500
                  focus-visible:ring-offset-0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your phone"
                className="border-green-300
                focus:border-green-600
                  focus-visible:ring-2
                focus-visible:ring-green-500
                  focus-visible:ring-offset-0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input value={user.email} disabled />
            </div>
            <Button className="bg-green-500 hover:bg-green-700" onClick={handleUpdateProfile}>Update Profile</Button>
          </div>
        </TabsContent>

        {/* Change Password */}
        <TabsContent value="password">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Old Password
              </label>
              <Input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Old Password"
                className="border-green-300
                focus:border-green-600
                  focus-visible:ring-2
                focus-visible:ring-green-500
                  focus-visible:ring-offset-0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                New Password
              </label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                className="border-green-300
                focus:border-green-600
                  focus-visible:ring-2
                focus-visible:ring-green-500
                  focus-visible:ring-offset-0"
              />
            </div>
            <Button className="bg-green-500 hover:bg-green-700" onClick={handleChangePassword}>Change Password</Button>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default ProfileCard;

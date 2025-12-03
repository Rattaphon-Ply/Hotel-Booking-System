import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import useStore from "@/store/store";
import { MoveRight } from "lucide-react";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const actionRegister = useStore((s) => s.actionRegister);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await actionRegister(form);
      toast.success(res.data.message)
      // หลังสมัครเสร็จให้ไปหน้า login
      navigate("/login", { state: { from: "register" } });
    } catch (err) {
      toast.warning(err.response?.data?.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
          scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
        }}
      >
        <div className="bg-white p-8 shadow-md rounded-lg">
          <h1 className="text-2xl text-center text-green-500 font-bold underline underline-offset-4 mb-6">
            Register
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input
                name="name"
                onChange={handleChange}
                required
                className="mt-2 border-green-300
                focus:border-green-600
                  focus-visible:ring-2
                focus-visible:ring-green-500
                  focus-visible:ring-offset-0"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                onChange={handleChange}
                required
                className="mt-2 border-green-300
                focus:border-green-600
                  focus-visible:ring-2
                focus-visible:ring-green-500
                  focus-visible:ring-offset-0"
              />
            </div>
            <div>
              <Label>Password</Label>
              <Input
                name="password"
                type="password"
                onChange={handleChange}
                required
                className="mt-2 border-green-300
                focus:border-green-600
                  focus-visible:ring-2
                focus-visible:ring-green-500
                  focus-visible:ring-offset-0"
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                name="phone"
                onChange={handleChange}
                className="mt-2 border-green-300 
                focus:border-green-600
                  focus-visible:ring-2
                focus-visible:ring-green-500
                  focus-visible:ring-offset-0"
              />
            </div>
            <Button className="w-full">Register</Button>
          </form>
          <div>
            <Link to="/login">
              <Button className="w-full mt-2 gap-2" variant="link">
                Login
                <MoveRight />
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;

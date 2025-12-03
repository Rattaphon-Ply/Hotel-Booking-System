import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
import useStore from "@/store/store";
import { MoveLeft } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const actionLogin = useStore((state) => state.actionLogin);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //ป้องกันการรีเฟรช

    // Send to Back || ส่งไปหลังบ้าน
    try {
      const res = await actionLogin(form);
      const role = res.data.user.role;
      roleRedirect(role);
      toast.success(res.data.message)
    } catch (err) {
      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
      console.log(err);
    }
  };

  const roleRedirect = (role) => {
    if (location.state?.from === "register") {
      navigate("/"); // ไปหน้า home แทน
      return;
    }

    if (role.toLowerCase() === "admin") {
      navigate("/admin");
    } else {
      navigate(-1);
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
        <div className="w-full bg-white p-8 max-w-md shadow-md rounded-lg">
          <h1 className="text-2xl text-green-500 text-center my-4 font-bold underline underline-offset-4">
            Login
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input
                  placeholder="Email"
                  onChange={handleOnChange}
                  name="email"
                  type="email"
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
                  placeholder="Password"
                  onChange={handleOnChange}
                  name="password"
                  type="password"
                  className="mt-2 border-green-300
                  focus:border-green-600
                    focus-visible:ring-2
                  focus-visible:ring-green-500
                    focus-visible:ring-offset-0"
                />
              </div>

              <Button className="w-full">Login</Button>
            </div>
          </form>
          <div>
            <Link to="/register">
              <Button className="w-full mt-2 gap-2" variant="link">
                <MoveLeft />
                Register
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
export default Login;

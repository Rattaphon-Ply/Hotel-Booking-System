import useStore from "@/store/store";
import { useEffect, useState } from "react";
import { createAmenities } from "@/api/amenities";
import InputForm from "../form/InputForm";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const FormCreateAmenty = () => {
  const token = useStore((s) => s.token);
  const getAmenities = useStore((s) => s.getAmenities);

  const [form, setForm] = useState({
    name: "",
  });

  useEffect(() => {
    getAmenities(token);
  }, [getAmenities]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createAmenities(token, { name: form.name });
      getAmenities(token);
      setForm({
        name: "",
      });
      toast.success(res.data.message);
    } catch (err) {
      console.error(err);
      toast.warning(err.response?.data?.message || err.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex justify-center mt-6"
    >
      <Card className="w-full max-w-xl shadow-lg p-4 rounded-2xl bg-white border">
        <CardContent>
          <p className="font-bold text-3xl text-center mb-6 text-black">
            Create Amenity
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center items-center gap-3">
              <InputForm
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="ชื่อสิ่งอำนวยความสะดวก"
                className="flex-1 border border-gray-400 rounded-xl px-3 py-2 focus:ring focus:ring-black transition bg-white text-black"
                label={null}
              />

              <Button
                type="submit"
                className="px-6 py-2 bg-black hover:bg-gray-800 rounded-xl text-white"
              >
                Create
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};
export default FormCreateAmenty;

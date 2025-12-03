import { createRoom } from "@/api/admin";
import InputForm from "@/components/form/InputForm";
import useStore from "@/store/store";
import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import TextAreaForm from "../form/TextAreaForm";
import { Button } from "../ui/button";
import { toast } from "sonner";

const FormCreateRoom = () => {
  const token = useStore((s) => s.token);
  const getRooms = useStore((s) => s.getRooms);

  const [images, setImages] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    pricePerNight: "0",
    maxGuests: "1",
    status: "AVAILABLE",
  });

  useEffect(() => {
    getRooms();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("pricePerNight", form.pricePerNight);
      formData.append("maxGuests", form.maxGuests);
      formData.append("status", form.status);

      images.forEach((img) => formData.append("images", img));

      const res = await createRoom(token, formData);
      // รีเซ็ตฟิลด์และรูปภาพ
      setForm({
        name: "",
        description: "",
        pricePerNight: "0",
        maxGuests: "1",
        status: "AVAILABLE",
      });
      setImages([]); // <-- รีเซ็ตรูปภาพ
      toast.success(res.data.message);
      await getRooms();
    } catch (err) {
      toast.warning(err.response?.data?.message);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-2">
        <p className="font-bold text-2xl text-center">Form Create Room</p>

        {/* แถวแรก */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <InputForm
            type="text"
            name="name"
            placeholder="Name"
            label="Name"
            value={form.name}
            onChange={handleChange}
          />
          <InputForm
            type="number"
            name="pricePerNight"
            placeholder="Price per night"
            label="Price per night"
            value={form.pricePerNight}
            onChange={handleChange}
          />
          <InputForm
            type="number"
            name="maxGuests"
            placeholder="Max guests"
            label="Max guests"
            value={form.maxGuests}
            onChange={handleChange}
          />
          <div className="grid gap-2">
            <Label>Status</Label>
            <Select
              value={form.status}
              onValueChange={(value) => setForm({ ...form, status: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AVAILABLE">Available</SelectItem>
                <SelectItem value="UNAVAILABLE">Unavailable</SelectItem>
                <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Description */}
        <div>
          <TextAreaForm
            label="Description"
            name="description"
            placeholder="Write a short room description..."
            value={form.description}
            onChange={handleChange}
            className=""
          />
        </div>

        <div>
          <Label className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-2xl hover:bg-blue-600">
            Upload Images
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden" // ซ่อน input จริง
            />
          </Label>
          <div className="mt-2 flex gap-2 flex-wrap">
            {images.map((file, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-600 text-white w-5 h-5 text-xs rounded-full"
                  onClick={() =>
                    setImages((prev) => prev.filter((_, i) => i !== index))
                  }
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ปุ่ม */}
        <div className="flex justify-end">
          <Button type="submit" className="bg-blue-600 text-white">
            Create Room
          </Button>
        </div>
      </form>
    </div>
  );
};
export default FormCreateRoom;

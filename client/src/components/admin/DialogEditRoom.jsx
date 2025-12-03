import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import InputForm from "../form/InputForm";
import useStore from "@/store/store";
import { useEffect, useState } from "react";
import { updateRoom } from "@/api/admin";
import { Spinner } from "../ui/spinner";
import ImageManager from "./ImageManager";
import { toast } from "sonner";

const DialogEditRoom = ({ room, onUpdated }) => {
  const token = useStore((s) => s.token);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: room?.name || "",
    description: room?.description || "",
    pricePerNight: room?.pricePerNight || "",
    maxGuests: room?.maxGuests || "",
  });
  const [newImages, setNewImages] = useState([]); // ไฟล์ที่เลือกเพิ่ม
  const [deleteImageIds, setDeleteImageIds] = useState([]); // ไอดีรูปที่ต้องลบ
  const [images, setImages] = useState(room?.images || []);

  useEffect(() => {
    if (open) {
      setForm({
        name: room?.name || "",
        description: room?.description || "",
        pricePerNight: room?.pricePerNight || "",
        maxGuests: room?.maxGuests || "",
      });
      setImages(room?.images || []);
      setNewImages([]);
      setDeleteImageIds([]);
    }
  }, [open, room]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("pricePerNight", form.pricePerNight);
      formData.append("maxGuests", form.maxGuests);
      formData.append("status", form.status);

      // ถ้ามีรูปที่จะลบ
      if (deleteImageIds.length > 0) {
        formData.append("deleteImageIds", JSON.stringify(deleteImageIds));
      }

      // ถ้ามีรูปใหม่
      newImages.forEach((file) => formData.append("newImages", file));

      const res = await updateRoom(token, room.id, formData);

      toast.success(res.data.message);
      if (onUpdated) onUpdated();
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.warning(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="relative">
          {loading && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10 pointer-events-none">
              <Spinner className="w-6 h-6" />
            </div>
          )}
          <form onSubmit={handleSubmit} className={loading ? "opacity-50" : ""}>
            <DialogHeader className="mb-2">
              <DialogTitle>Edit Room</DialogTitle>
              <DialogDescription>
                แก้ไขข้อมูลห้องด้านล่าง อย่าลืมกด Update Images
                เพื่อบันทึกการแก้ไขรูป
              </DialogDescription>
            </DialogHeader>

            {/* Section รูปภาพ */}
            <ImageManager
              images={images}
              setImages={setImages}
              newImages={newImages}
              setNewImages={setNewImages}
              deleteImageIds={deleteImageIds}
              setDeleteImageIds={setDeleteImageIds}
            />

            {/* section room data */}
            <div className="grid gap-4">
              <InputForm
                name="name"
                label="Name"
                placeholder="Name"
                type="text"
                value={form.name}
                onChange={handleChange}
              />
              <InputForm
                name="description"
                label="Description"
                placeholder="Description"
                type="text"
                value={form.description}
                onChange={handleChange}
              />
              <div className="flex gap-2">
                <InputForm
                  name="pricePerNight"
                  label="Price per night"
                  placeholder="1000"
                  type="number"
                  value={form.pricePerNight}
                  onChange={handleChange}
                />
                <InputForm
                  name="maxGuests"
                  label="Max Guests"
                  placeholder="2"
                  type="number"
                  value={form.maxGuests}
                  onChange={handleChange}
                />
              </div>
            </div>
            <DialogFooter className="mt-2">
              <DialogClose asChild>
                <Button variant="outline" disabled={loading}>
                  Cancel
                </Button>
              </DialogClose>

              <Button type="submit" disabled={loading}>
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default DialogEditRoom;

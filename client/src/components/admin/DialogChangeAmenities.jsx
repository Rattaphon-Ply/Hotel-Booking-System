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
import { Spinner } from "../ui/spinner";
import { Wrench } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "../ui/label";
import { ChangeAmenities } from "@/api/admin";
import { toast } from "sonner";

const DialogChangeAmenities = ({ room, getRooms }) => {
  const token = useStore((s) => s.token);
  const getAmenities = useStore((s) => s.getAmenities);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [allAmenities, setAllAmenities] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  useEffect(() => {
    if (open) {
      const fetchData = async () => {
        const data = await getAmenities(token); // ✅ ตอนนี้ getAmenities คืน data แล้ว
        setAllAmenities(data);
        const currentIds = room.amenities?.map((a) => a.amenityId) || [];
        setSelectedAmenities(currentIds);
      };
      fetchData();
    }
  }, [open]);

  const handleToggle = (amenityId) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenityId)
        ? prev.filter((id) => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await ChangeAmenities(token, room.id, selectedAmenities);
      toast.success(res.data.message)
      await getRooms();
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
        <Button variant="ghost" size="icon">
          <Wrench />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[450px] h-[380px] overflow-hidden">
        <div className="relative h-full">
          {loading && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10 pointer-events-none">
              <Spinner className="w-6 h-6" />
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className={`flex flex-col h-full ${loading ? "opacity-50" : ""}`}
          >
            <DialogHeader className="mb-2">
              <DialogTitle>Change Amenities</DialogTitle>
              <DialogDescription>
                เลือกสิ่งอำนวยความสะดวกของห้องนี้
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 max-h-60 overflow-y-auto pr-2">
              {allAmenities.length > 0 ? (
                allAmenities.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`amenity-${item.id}`}
                      checked={selectedAmenities.includes(item.id)}
                      onCheckedChange={() => handleToggle(item.id)}
                    />
                    <Label htmlFor={`amenity-${item.id}`}>{item.name}</Label>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 col-span-2 text-center">
                  No amenities available
                </p>
              )}
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
export default DialogChangeAmenities;

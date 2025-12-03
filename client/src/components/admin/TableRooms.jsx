import useStore from "@/store/store";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { removeRoom, updateRoomStatus } from "@/api/admin";
import DialogEditRoom from "./DialogEditRoom";
import DialogChangeAmenities from "./DialogChangeAmenities";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

const TableRooms = () => {
  const token = useStore((s) => s.token);
  const getRooms = useStore((s) => s.getRooms);
  const rooms = useStore((s) => s.rooms);

  useEffect(() => {
    getRooms();
  }, []);

  const handleDeleteRoom = async (id) => {
    try {
      const res = await removeRoom(token, id);
      toast.success(res.data.message)
      getRooms();
      console.log(res.data.message);
    } catch (err) {
      console.error(err);
      toast.warning(err.response?.data?.message || err.message);
    }
  };

  const handleChangeStatus = async (id, newStatus) => {
    try {
      const res = await updateRoomStatus(token, id, newStatus);
      toast.success(res.data.message)
      await getRooms();
    } catch (err) {
      console.error(err);
      toast.warning(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
      <div>
        <Table className="table">
          <TableCaption>Rooms Management</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-center">No.</TableHead>
              <TableHead className="text-left">Name</TableHead>
              <TableHead className="text-left">Description</TableHead>
              <TableHead className="text-left">Amenities</TableHead>
              <TableHead className="text-center">maxGuests</TableHead>
              <TableHead className="text-center">pricePerNight</TableHead>
              <TableHead className="text-center">วันที่แก้ไขล่าสุด</TableHead>
              <TableHead className="text-center">status</TableHead>
              <TableHead className="text-center w-[150px]">จัดการ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rooms?.map((item, index) => {
              const rowNumber = index + 1;
              return (
                <TableRow key={index}>
                  <TableHead scope="row" className="text-center">
                    {rowNumber + "."}
                  </TableHead>
                  <TableCell className="text-left">{item.name}</TableCell>
                  <TableCell className="text-left max-w-[200px] truncate">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="truncate cursor-default w-full">
                            {item.description}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs break-words">
                          {item.description}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell className="text-left max-w-[200px] truncate flex items-center justify-between gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="truncate cursor-default">
                            {item.amenities
                              ?.map((a) => a?.amenity?.name)
                              .filter(Boolean) // กรอง undefined
                              .join(", ") || "-"}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          {item.amenities
                            ?.map((a) => a?.amenity?.name)
                            .filter(Boolean)
                            .join(", ")}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <DialogChangeAmenities room={item} getRooms={getRooms} />
                  </TableCell>
                  <TableCell className="text-center">
                    {item.maxGuests}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.pricePerNight}
                  </TableCell>
                  <TableCell className="text-center">
                    {new Date(item.updatedAt).toLocaleString("th-TH")}
                  </TableCell>
                  <TableCell className="text-center">
                    <Select
                      value={item.status}
                      onValueChange={(v) => handleChangeStatus(item.id, v)}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AVAILABLE">Available</SelectItem>
                        <SelectItem value="UNAVAILABLE">Unavailable</SelectItem>
                        <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="flex text-center gap-2">
                    <DialogEditRoom room={item} onUpdated={getRooms} />

                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteRoom(item.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default TableRooms;

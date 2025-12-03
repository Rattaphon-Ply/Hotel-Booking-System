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
import { Button } from "../ui/button";
import { removeAmenity, updateAmenity } from "@/api/amenities";
import { Input } from "../ui/input";
import { toast } from "sonner";

const TableAmenities = () => {
  const getAmenities = useStore((s) => s.getAmenities);
  const amenities = useStore((s) => s.amenities);
  const token = useStore((s) => s.token);

  const [name, setName] = useState("");
  const [Id, setId] = useState(null);

  useEffect(() => {
    getAmenities(token);
  }, []);

  const handleEdit = async (item) => {
    setId(item.id);
    setName(item.name);
  };

  const handleCancel = () => {
    setId(null);
    setName("");
  };

  const handleUpdate = async (id) => {
    try {
      const res = await updateAmenity(token, id, name);
      toast.success(res.data.message);
      setId(null);
      getAmenities(token);
    } catch (err) {
      console.error(err);
      toast.warning(err.response?.data?.message || err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await removeAmenity(token, id);
      getAmenities(token);
      toast.success(res.data.message);
    } catch (err) {
      console.error(err);
      toast.warning(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
      <Table>
        <TableCaption>Amenities Management</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center">No.</TableHead>
            <TableHead className="text-left">Name</TableHead>
            <TableHead className="text-center w-[220px]">จัดการ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {amenities?.map((item, index) => {
            const rowNumber = index + 1;
            const isEditing = Id === item.id;

            return (
              <TableRow key={item.id}>
                <TableCell className="text-center">{rowNumber}.</TableCell>

                <TableCell className="text-left">
                  {isEditing ? (
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="max-w-sm"
                    />
                  ) : (
                    item.name
                  )}
                </TableCell>

                <TableCell className="flex gap-2 justify-center">
                  {isEditing ? (
                    <>
                      <Button onClick={() => handleUpdate(item.id)}>
                        Save
                      </Button>
                      <Button variant="outline" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="secondary"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
export default TableAmenities;

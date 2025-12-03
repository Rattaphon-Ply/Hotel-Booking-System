import { changeRole, getListAllUser, removeUser } from "@/api/admin";
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
import { toast } from "sonner";

const TableUser = () => {
  const token = useStore((s) => s.token);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    handleGetUser(token);
  }, []);

  const handleGetUser = (token) => {
    getListAllUser(token)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeRole = async (id, newRole) => {
    try {
      const res = await changeRole(token, id, newRole);
      handleGetUser(token);
      toast.success(res.data.message);
    } catch (err) {
      console.error(err);
      toast.warning(err.response?.data?.message || err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await removeUser(token, id);
      handleGetUser(token);
      toast.success(res.data.message);
    } catch (err) {
      console.error(err);
      toast.warning(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
      <div>
        <Table className="table">
          <TableCaption>User Management</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-center">No.</TableHead>
              <TableHead className="text-left">Name</TableHead>
              <TableHead className="text-left">Email</TableHead>
              <TableHead className="text-center">Phone</TableHead>
              <TableHead className="text-center">วันที่แก้ไขล่าสุด</TableHead>
              <TableHead className="text-center w-[150px]">สิทธิ์</TableHead>
              <TableHead className="text-center w-[150px]">จัดการ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((item, index) => {
              const rowNumber = index + 1;
              return (
                <TableRow key={index}>
                  <TableHead scope="row" className="text-center">
                    {rowNumber}
                  </TableHead>
                  <TableCell className="text-left">{item.name}</TableCell>
                  <TableCell className="text-left">{item.email}</TableCell>
                  <TableCell className="text-center">{item.phone}</TableCell>
                  <TableCell className="text-center">
                    {new Date(item.updatedAt).toLocaleString("th-TH", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell className="text-center ">
                    <Select
                      value={item.role}
                      onValueChange={(value) =>
                        handleChangeRole(item.id, value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USER">USER</SelectItem>
                        <SelectItem value="ADMIN">ADMIN</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(item.id)}
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
export default TableUser;

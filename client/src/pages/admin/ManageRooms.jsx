import TableRooms from "@/components/admin/TableRooms";
import FormCreateRoom from "@/components/admin/FormCreateRoom";
import RoomFilterBar from "@/components/RoomFilterBar";

const ManageRooms = () => {
  return (
    <div className="space-y-5">
      <FormCreateRoom />
      <RoomFilterBar
        showDate={false}
        bgColor="#F5F5F5"
        primaryColor="#212121" 
        buttonColor="#424242"
      />
      <TableRooms />
    </div>
  );
};
export default ManageRooms;

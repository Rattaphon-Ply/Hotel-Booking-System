import DetailCard from "@/components/card/DetailCard";
import { useParams } from "react-router-dom";

const RoomDetail = () => {
  const { id } = useParams(); // ดึง id จาก URL
  return (
    <div>
      <DetailCard id={id} />
    </div>
  );
};
export default RoomDetail;

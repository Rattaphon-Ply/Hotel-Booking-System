import axios from "axios";

export const listRooms = async () =>
  await axios.get("http://localhost:5002/api/rooms");

export const detailRoom = async (id) => {
  const res = await axios.get(`http://localhost:5002/api/rooms/${id}`);
  return res.data;
};

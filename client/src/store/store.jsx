import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Login, Register } from "@/api/auth";
import { detailRoom, listRooms } from "@/api/rooms";
import { getListAmenities } from "@/api/amenities";
import axios from "axios";

const Store = (set, get) => ({
  user: null,
  token: null,
  rooms: [],
  roomDetail: null,
  amenities: [],
  error: null,

  actionRegister: async (form) => {
    const res = await Register(form);

    return res;
  },

  actionLogin: async (form) => {
    const res = await Login(form);
    set({
      user: res.data.user,
      token: res.data.token,
    });
    return res;
  },

  getRooms: async () => {
    try {
      const res = await listRooms();
      set({ rooms: res.data });
    } catch (error) {
      console.log(error);
    }
  },

  getRoomDetail: async (id) => {
    try {
      set({ roomDetail: null });
      const res = await detailRoom(id); // ใช้ฟังก์ชันจาก import
      set({ roomDetail: res }); // res คือ data แล้ว ไม่ต้อง .data อีก
    } catch (err) {
      console.log(err);
      set({ roomDetail: undefined });
    }
  },

  getAmenities: async () => {
    try {
      const token = get().token;
      const res = await getListAmenities(token);
      set({ amenities: res.data });
      return res.data;
    } catch (err) {
      console.error("Error getList amenities:", err);
    }
  },

  searchRooms: async (filters) => {
    set({ error: null });
    try {
      const res = await axios.post(
        "http://localhost:5002/api/rooms/search",
        filters
      );
      set({ rooms: res.data.rooms });
    } catch (err) {
      set({ error: err.message });
    }
  },

  logout: () => {
    set({
      user: null,
      token: null,
    });
    useStore.persist.clearStorage();
  },
});

const usePersist = {
  name: "store",
  storage: createJSONStorage(() => localStorage),
};

const useStore = create(persist(Store, usePersist));
export default useStore;

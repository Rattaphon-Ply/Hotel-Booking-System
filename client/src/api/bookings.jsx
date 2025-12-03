import axios from "axios";

export const createBooking = async (token, data) => {
  return axios.post("http://localhost:5002/api/bookings", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getMyBooking = async (token) => {
  const res = await axios.get("http://localhost:5002/api/bookings/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data; // ✅ ต้องเป็น res.data
};

export const canceledBooking = async (token, bookingId) => {
  const res = await axios.patch(
    `http://localhost:5002/api/bookings/${bookingId}/cancel`,
    { action: "cancel" },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const bookedDates = async (token, roomId) => {
  return axios.get(
    `http://localhost:5002/api/bookings/${roomId}/booked-dates`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

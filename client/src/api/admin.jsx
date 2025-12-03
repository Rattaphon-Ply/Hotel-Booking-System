import axios from "axios";

export const getListAllUser = async (token) => {
  return axios.get("http://localhost:5002/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeRole = async (token, id, role) => {
  return axios.patch(
    `http://localhost:5002/api/users/${id}/role`,
    { role }, // body ที่ส่งไป
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const removeUser = async (token, id) => {
  return axios.delete(`http://localhost:5002/api/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeRoom = async (token, id) => {
  return axios.delete(`http://localhost:5002/api/rooms/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateRoom = async (token, id, formData) => {
  return axios.patch(`http://localhost:5002/api/rooms/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateRoomStatus = async (token, id, status) => {
  return axios.patch(
    `http://localhost:5002/api/rooms/${id}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const createRoom = async (token, formData) => {
  return axios.post("http://localhost:5002/api/rooms", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const ChangeAmenities = async (token, roomId, selectedAmenities) => {
  return axios.post(
    `http://localhost:5002/api/rooms/${roomId}/amenities`,
    { amenityIds: selectedAmenities },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const ListAllBookings = async (token) => {
  return axios.get("http://localhost:5002/api/bookings", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeBookingsToCompleted = async (token, id) => {
  return axios.patch(
    `http://localhost:5002/api/bookings/${id}/complete`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getListPayments = async (token) => {
  return axios.get("http://localhost:5002/api/payments", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

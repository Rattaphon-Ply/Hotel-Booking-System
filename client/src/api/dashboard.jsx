import axios from "axios";

export const getSummary = async (token, id) => {
  return axios.get("http://localhost:5002/api/dashboard/summary", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getBookings = async (token, id) => {
  return axios.get("http://localhost:5002/api/dashboard/bookings", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getPayments = async (token, id) => {
  return axios.get("http://localhost:5002/api/dashboard/payments", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getRooms = async (token, id) => {
  return axios.get("http://localhost:5002/api/dashboard/rooms", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAmenities = async (token, id) => {
  return axios.get("http://localhost:5002/api/dashboard/amenities", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
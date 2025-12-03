import axios from "axios";

export const getListAmenities = async (token) => {
  return axios.get("http://localhost:5002/api/amenities", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createAmenities = async (token, form) => {
  return axios.post("http://localhost:5002/api/amenities", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateAmenity = async (token, id, name) => {
  return axios.patch(
    `http://localhost:5002/api/amenities/${id}`,
    { name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const removeAmenity = async (token, id) => {
  return axios.delete(`http://localhost:5002/api/amenities/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

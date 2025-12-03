import axios from "axios";

export const getProfileUser = async (token) => {
  return axios.get("http://localhost:5002/api/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changeProfileUser = async (token, data) => {
  return axios.patch("http://localhost:5002/api/users/profile", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changePasswordUser = async (token, password) => {
  return axios.patch(
    "http://localhost:5002/api/users/change-password",
    password,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

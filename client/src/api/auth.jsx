import axios from "axios";

export const currentUser = async (token) => {
  try {
    return axios.post(
      "http://localhost:5002/api/current-user",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (err) {
    if (err.response?.status === 401) {
      useStore.getState().logout(); // 🚀 เคลียร์ user + token ทันที
    }
    throw err;
  }
};

export const currentAdmin = async (token) =>
  await axios.post(
    "http://localhost:5002/api/current-admin",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const Login = async (form) =>
  await axios.post("http://localhost:5002/api/login", form);

export const Register = async (form) =>
  await axios.post("http://localhost:5002/api/register", form);

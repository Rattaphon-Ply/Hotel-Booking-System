import axios from "axios";

export const createPayment = (token, data) => {
  return axios.post("http://localhost:5002/api/payments", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getPaymentDetail = (token, id) => {
  return axios.get(`http://localhost:5002/api/payments/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

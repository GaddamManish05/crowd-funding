import axios from "axios";

export const createOrder = async (amount) => {
  const res = await axios.post("/api/payment/create-order", { amount });
  return res.data;
};

export const verifyPayment = async (data) => {
  const res = await axios.post("/api/payment/verify-payment", data);
  return res.data;
};
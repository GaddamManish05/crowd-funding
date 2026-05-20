import axios from "axios";

// CREATE ORDER
const BASE_URL = import.meta.env.VITE_API_URL;

export const createOrder = async(amount) => {
    const res = await axios.post(`${BASE_URL}/payment-api/create-order`, { amount }, { withCredentials: true });
    return res.data;
};

// VERIFY PAYMENT

export const verifyPayment = async(data) => {
    const res = await axios.post(`${BASE_URL}/payment-api/verify-payment`, data, { withCredentials: true });
    return res.data;
};
import exp from "express";
import { VerifyToken } from "../Middlewares/VerifyToken.js";
import { CheckUser } from "../Middlewares/CheckUser.js";
import {createOrder,verifyPayment,validateDonation} from "../Controllers/PaymentController.js";
const PaymentApi = exp.Router();
// Create Razorpay order
PaymentApi.post("/create-order", VerifyToken, CheckUser, createOrder);
// Payment verification
PaymentApi.post("/verify-payment", VerifyToken, CheckUser, verifyPayment);
// pre validation payment
PaymentApi.post("/validate-donation",VerifyToken,validateDonation);
export default PaymentApi;
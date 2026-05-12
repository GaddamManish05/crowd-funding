import exp from "express";
import { VerifyToken } from "../Middlewares/VerifyToken.js";
import { CheckUser } from "../Middlewares/CheckUser.js";
import { DonationCollector,ShowDonations } from "../Controllers/DonationController.js";
const DonorApi = exp.Router();
//get all campaigns with user name and donations
DonorApi.get("/campaigns", VerifyToken, CheckUser, ShowDonations);
//donate money to a campaign
DonorApi.post("/donate", VerifyToken, CheckUser, DonationCollector);
export default DonorApi;
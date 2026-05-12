import exp from "express";
import { VerifyToken } from "../Middlewares/VerifyToken.js";
import { CheckUser } from "../Middlewares/CheckUser.js";
import { getUserDetails, getUserCampaigns, getUserDonations } from "../Controllers/UserController.js";
const UserApi = exp.Router();
//get user details
UserApi.get("/details", VerifyToken, CheckUser, getUserDetails);
//get users campaigns
UserApi.get("/campaigns", VerifyToken, CheckUser, getUserCampaigns);
//get users donations
UserApi.get("/donations", VerifyToken, CheckUser, getUserDonations);

export default UserApi
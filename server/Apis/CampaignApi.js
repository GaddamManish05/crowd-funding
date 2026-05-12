import exp from "express";
import { VerifyToken } from "../Middlewares/VerifyToken.js";
import { createCampaign,getDonationList } from "../Controllers/CampaignController.js";
import { CheckUser } from "../Middlewares/CheckUser.js";
const CampaignApi = exp.Router();
//create campaign
CampaignApi.post("/add", VerifyToken, CheckUser, createCampaign);
//get donation list of a campaign
CampaignApi.get("/donations/:id", VerifyToken, CheckUser, getDonationList);
export default CampaignApi;
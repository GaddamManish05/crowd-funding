// ==========================================
// 1. IMPORTS & DEPENDENCIES
// ==========================================
import exp from "express";
import { VerifyToken } from "../Middlewares/VerifyToken.js";
import { createCampaign, getDonationList } from "../Controllers/CampaignController.js";
import { CheckUser } from "../Middlewares/CheckUser.js";
import { upload } from "../Middlewares/Upload.js";

const CampaignApi = exp.Router();

// ==========================================
// 2. ROUTES & MIDDLEWARES
// ==========================================

// CREATE CAMPAIGN
CampaignApi.post("/add", VerifyToken, CheckUser, upload.single("Image"), createCampaign);

// GET DONATION LIST
CampaignApi.get("/donations/:id", VerifyToken, CheckUser, getDonationList);

// ==========================================
// 3. EXPORTS
// ==========================================
export default CampaignApi;
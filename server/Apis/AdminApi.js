import express from "express";
import { approveCampaign, rejectCampaign, getPendingCampaigns,
    getAdminStats ,
    getRecentCampaigns,
    getRecentDonations,
    getAllCampaigns,
    getDonations,
    getAllUsers,
    deleteUser,
    updateRole } from "../Controllers/AdminController.js";
import { VerifyToken } from "../Middlewares/VerifyToken.js";
import { CheckAdmin } from "../Middlewares/CheckAdmin.js";

const AdminApi = express.Router();
// get all pending campaigns
AdminApi.get("/pending-campaigns", VerifyToken, CheckAdmin, getPendingCampaigns);
// approve campaign by id
AdminApi.put("/approve-campaign/:id", VerifyToken, CheckAdmin, approveCampaign);
// reject campaign by id
AdminApi.put("/reject-campaign/:id", VerifyToken, CheckAdmin, rejectCampaign);
// 
AdminApi.get("/stats", VerifyToken, CheckAdmin, getAdminStats);
// get recent campaigns
AdminApi.get('/recent-campaigns',VerifyToken,CheckAdmin,getRecentCampaigns);
// get recent Donations
AdminApi.get('/recent-donations',VerifyToken,CheckAdmin,getRecentDonations);

// get all campaigns
AdminApi.get('/campaigns',VerifyToken,CheckAdmin,getAllCampaigns);
// get all donations
AdminApi.get('/donations',getDonations,VerifyToken,CheckAdmin);

AdminApi.get('/all-users',getAllUsers,VerifyToken,CheckAdmin);

// soft delete the user
AdminApi.put('/soft-delete/:id',VerifyToken,CheckAdmin);

AdminApi.put('/update-role/:id',VerifyToken,CheckAdmin);

export default AdminApi;
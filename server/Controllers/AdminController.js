// ==========================================
// 1. IMPORTS & DEPENDENCIES
// ==========================================
import CampaignModel from "../Models/CampaignModel.js";
import UserModel from "../Models/UserModel.js";
import DonationModel from "../Models/DonationModel.js";
import NotificationModel from "../Models/NotificationModel.js";
import { transporter } from "../config/Nodemailer.js";

// ==========================================
// 2. CORE CONTROLLER FUNCTIONS
// ==========================================

// Get all pending campaigns
export const getPendingCampaigns = async (req, res) => {
  try {
    const pendingCampaigns = await CampaignModel
      .find({ Status: "pending" })
      .populate("Owner", "FirstName LastName Email")
      .populate("Donations");

    res.json({ pendingCampaigns });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching pending campaigns",
      error: error.message
    });
  }
};

// Approve campaign
export const approveCampaign = async (req, res) => {
  console.log(req.params.id);
  try {
    const alreadyApproved = await CampaignModel.findOne({ _id: req.params.id, Status: "active" });
    if (alreadyApproved) {
      return res.status(400).json({ message: "Campaign is already approved" });
    }
    const campaign = await CampaignModel.findByIdAndUpdate(
      req.params.id,
      { Status: "active" },
      { new: true }
    );

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    await NotificationModel.create({
      userId: campaign.Owner,
      title: "✅ Campaign Approved",
      message: `${campaign.Title} has been approved`,
      type: "campaign"
    });
    const user = await UserModel.findById(campaign.Owner);

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: user.Email,
      subject: "Campaign Approved 🎉",
      html: `<div style="background:#f4f7fb;padding:40px 20px;font-family:Arial,sans-serif;"><div style="max-width:600px;margin:auto;background:white;border-radius:18px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);"><!-- HEADER --><div style="background:linear-gradient(135deg,#0071e3,#2563eb);padding:35px;text-align:center;color:white;"><h1 style="margin:0;font-size:30px;">Campaign Approved 🎉</h1><p style="margin-top:10px;opacity:0.9;font-size:15px;">Your campaign is now live for donations 🚀</p></div><!-- BODY --><div style="padding:40px 35px;color:#333;"><h2 style="margin-top:0;font-size:24px;color:#111827;">Hello ${user.FirstName},</h2><p style="margin-top:30px;line-height:1.8;color:#4b5563;font-size:15px;">Your campaign <strong>${campaign.Title}</strong> has been approved successfully by our admin team.</p><!-- INFO BOX --><div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:20px;margin-top:25px;"><p style="margin:0 0 10px 0;"><strong>Campaign:</strong> ${campaign.Title}</p><p style="margin:0;">Your campaign is now visible to users and can start receiving donations.</p></div><!-- MESSAGE --><p style="margin-top:30px;line-height:1.8;color:#4b5563;font-size:15px;">We wish you success in reaching your fundraising goal and making a positive impact 🚀</p></div><!-- FOOTER --><div style="background:#f9fafb;padding:20px;text-align:center;color:#9ca3af;font-size:13px;border-top:1px solid #e5e7eb;">CrowdFunding Platform © 2026</div></div></div>`
    });

    res.json({
      message: "Campaign approved successfully",
      payload: campaign
    });
    console.log(res.message);
  } catch (error) {
    res.status(500).json({
      message: "Error approving campaign",
      error: error.message
    });
  }
};

// Reject campaign
export const rejectCampaign = async (req, res) => {
  try {
    const campaign = await CampaignModel.findByIdAndUpdate(
      req.params.id,
      { Status: "reject" },
      { new: true }
    );

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    await NotificationModel.create({
      userId: campaign.Owner,
      title: "❌ Campaign Rejected",
      message: `Your campaign "${campaign.Title}" was rejected`,
      type: "campaign"
    });
    
    const user = await UserModel.findById(campaign.Owner);

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: user.Email,
      subject: "Campaign Rejected ❌",
      html: `<div style="background:#f4f7fb;padding:40px 20px;font-family:Arial,sans-serif;"><div style="max-width:600px;margin:auto;background:white;border-radius:18px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);"><!-- HEADER --><div style="background:linear-gradient(135deg,#ef4444,#dc2626);padding:35px;text-align:center;color:white;"><h1 style="margin:0;font-size:30px;">Campaign Rejected ❌</h1><p style="margin-top:10px;opacity:0.9;font-size:15px;">Admin review could not approve your campaign</p></div><!-- BODY --><div style="padding:40px 35px;color:#333;"><h2 style="margin-top:0;font-size:24px;color:#111827;">Hello ${user.FirstName},</h2><p style="margin-top:30px;line-height:1.8;color:#4b5563;font-size:15px;">Your campaign <strong>${campaign.Title}</strong> was rejected after admin review.</p><!-- INFO BOX --><div style="background:#fef2f2;border:1px solid #fecaca;border-radius:12px;padding:20px;margin-top:25px;"><p style="margin:0;color:#991b1b;">Please review your campaign details and make sure all required information is valid before submitting again.</p></div><!-- MESSAGE --><p style="margin-top:30px;line-height:1.8;color:#4b5563;font-size:15px;">Thank you for using our crowdfunding platform 🚀</p></div><!-- FOOTER --><div style="background:#f9fafb;padding:20px;text-align:center;color:#9ca3af;font-size:13px;border-top:1px solid #e5e7eb;">CrowdFunding Platform © 2026</div></div></div>`
    });

    res.json({
      message: "Campaign rejected successfully",
      payload: campaign
    });
  } catch (error) {
    res.status(500).json({
      message: "Error rejecting campaign",
      error: error.message
    });
  }
};

// Get admin dashboard stats
export const getAdminStats = async (req, res) => {
  try {
    // Counts (parallel for performance)
    const [
      totalUsers,
      totalCampaigns,
      totalDonations,
      activeCampaigns,
      pendingCampaigns,
      rejectedCampaigns,
      completedCampaigns,
      fundsData
    ] = await Promise.all([
      UserModel.countDocuments(),
      CampaignModel.countDocuments(),
      DonationModel.countDocuments(),
      CampaignModel.countDocuments({ Status: "active" }),
      CampaignModel.countDocuments({ Status: "pending" }),
      CampaignModel.countDocuments({ Status: "reject" }),
      CampaignModel.countDocuments({ Status: "completed" }),
      DonationModel.aggregate([{ $group: { _id: null, total: { $sum: "$Amount" } } }])
    ]);
    const totalFunds = fundsData[0]?.total || 0;
    return res.status(200).json({
      users: totalUsers,
      campaigns: totalCampaigns,
      donations: totalDonations,
      funds: totalFunds,
      campaignStatus: {
        active: activeCampaigns,
        pending: pendingCampaigns,
        rejected: rejectedCampaigns,
        completed: completedCampaigns
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching admin stats",
      error: error.message
    });
  }
};

// GET /admin-api/campaigns
export const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await CampaignModel.find().sort({ createdAt: -1 });
    res.json({ payload: campaigns });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/admin/recent-campaigns
export const getRecentCampaigns = async (req, res) => {
  try {
    const campaigns = await CampaignModel
      .find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({ payload: campaigns });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/admin/recent-donations
export const getRecentDonations = async (req, res) => {
  try {
    const donations = await DonationModel
      .find()
      .populate("Donor", "FirstName LastName Email")
      .populate("Campaign", "Title")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({ payload: donations });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all donations
export const getDonations = async (req, res) => {
  try {
    const donations = await DonationModel
      .find()
      .populate("Donor", "FirstName LastName Email")
      .populate("Campaign", "Title")
      .sort({ createdAt: -1 });
    console.log(donations);
    res.json({ payload: donations });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({ Role: { $in: ["user", "admin"] } });

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({
      message: "Users fetched successfully",
      payload: users
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Soft delete / Toggle active status
export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const existingUser = await UserModel.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const updatedUser = await UserModel.findByIdAndUpdate(userId, { IsActive: !existingUser.IsActive }, { new: true });
    res.status(200).json({ message: updatedUser.IsActive ? "User Restored" : "User Deleted", payload: updatedUser });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update user role
export const updateRole = async (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  const { Role } = req.body;
  try {
    const user = await UserModel.findByIdAndUpdate(userId, { Role: Role }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json({
      message: "Users fetched successfully",
      payload: user
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};
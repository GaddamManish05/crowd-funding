// ==========================================
// 1. IMPORTS & DEPENDENCIES
// ==========================================
import mongoose from "mongoose";
import CampaignModel from "../Models/CampaignModel.js";
import DonationModel from "../Models/DonationModel.js";
import UserModel from "../Models/UserModel.js";
import NotificationModel from "../Models/NotificationModel.js";

// ==========================================
// 2. CORE CONTROLLER FUNCTIONS
// ==========================================

/**
 * @desc    Create a new fundraising campaign
 * @route   POST /api/campaigns
 * @access  Private
 */
export const createCampaign = async (req, res) => {
    try {
        const { Title, Description, Category, GoalAmount, DeadLine } = req.body;

        // 1. Required Fields Validation
        if (!Title || !Description || !Category || !GoalAmount || !DeadLine) {
            return res.status(400).json({ message: "All campaign fields are required" });
        }

        // 2. Input Length Validation
        if (Title.trim().length < 8) {
            return res.status(400).json({ message: "Campaign title must contain at least 8 characters" });
        }
        if (Description.trim().length < 50) {
            return res.status(400).json({ message: "Description must contain at least 50 characters" });
        }

        // 3. Goal Amount Validation
        const parsedGoalAmount = Number(GoalAmount);
        if (!Number.isFinite(parsedGoalAmount)) {
            return res.status(400).json({ message: "GoalAmount must be a valid number" });
        }
        if (parsedGoalAmount < 500 || parsedGoalAmount > 1000000) {
            return res.status(400).json({ message: "GoalAmount must be between ₹500 and ₹10,00,000" });
        }

        // 4. Deadline Date Validation
        const parsedDeadline = new Date(DeadLine);
        if (Number.isNaN(parsedDeadline.getTime())) {
            return res.status(400).json({ message: "DeadLine must be a valid date" });
        }

        const currentDate = new Date();
        const minDate = new Date();
        minDate.setDate(currentDate.getDate() + 7);

        const maxDate = new Date();
        maxDate.setFullYear(currentDate.getFullYear() + 1);

        if (parsedDeadline < minDate) {
            return res.status(400).json({ message: "DeadLine must be at least 7 days from today" });
        }
        if (parsedDeadline > maxDate) {
            return res.status(400).json({ message: "DeadLine cannot exceed 1 year" });
        }

        // 5. File Attachment Validation
        if (!req.file) {
            return res.status(400).json({ message: "Campaign image is required" });
        }

        // 6. Duplicate Prevention Check
        const existingCampaign = await CampaignModel.findOne({
            Title: Title.trim(),
            Owner: req.user.userId
        });

        if (existingCampaign) {
            return res.status(400).json({ message: "Campaign with same title already exists" });
        }

        // 7. Database Write Execution
        const campaign = await CampaignModel.create({
            Title: Title.trim(),
            Description: Description.trim(),
            Category,
            GoalAmount: parsedGoalAmount,
            DeadLine: parsedDeadline,
            Owner: req.user.userId,
            ImageUrl: req.file.path
        });

        // 8. Admin Notification Dispatch
        const admins = await UserModel.find({ Role: "admin" });
        const adminNotifications = admins.map((admin) => ({
            userId: admin._id,
            title: "New Campaign Request",
            message: `${campaign.Title} is pending approval`,
            type: "campaign"
        }));

        if (adminNotifications.length > 0) {
            await NotificationModel.insertMany(adminNotifications);
        }

        return res.status(201).json({ success: true, payload: campaign });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Campaign creation failed",
            error: error.message
        });
    }
};

/**
 * @desc    Get complete donation details and metrics for a specific campaign
 * @route   GET /api/campaigns/:id/donations
 * @access  Public/Private
 */
export const getDonationList = async (req, res) => {
    const campaignId = req.params.id;

    try {
        // 1. Parameter Validation
        if (!mongoose.Types.ObjectId.isValid(campaignId)) {
            return res.status(400).json({ message: "Invalid campaign ID" });
        }

        // 2. Data Retrieval (Campaign Core & Population)
        const campaign = await CampaignModel.findById(campaignId)
            .populate("Owner", "FirstName LastName Email");

        if (!campaign) {
            return res.status(404).json({ message: "Campaign not found" });
        }

        // 3. Data Retrieval (Associated Donations)
        const donations = await DonationModel.find({ Campaign: campaignId })
            .populate("Donor", "FirstName LastName Email PhoneNumber")
            .sort({ createdAt: -1 });

        // 4. Metric Computations
        const progress = Math.min((campaign.CurrentAmount / campaign.GoalAmount) * 100, 100);

        const donorList = donations.map((donation) => ({
            donorName: donation.Donor ? `${donation.Donor.FirstName} ${donation.Donor.LastName}` : "Unknown",
            donorEmail: donation.Donor?.Email,
            donorPhone: donation.Donor?.PhoneNumber,
            amount: donation.Amount,
            date: donation.createdAt
        }));

        // 5. Response Assembler
        return res.status(200).json({
            campaign: {
                title: campaign.Title,
                description: campaign.Description,
                category: campaign.Category,
                goalAmount: campaign.GoalAmount,
                currentAmount: campaign.CurrentAmount,
                status: campaign.Status,
                deadline: campaign.DeadLine,
                owner: `${campaign.Owner?.FirstName || ""} ${campaign.Owner?.LastName || ""}`.trim()
            },
            stats: {
                totalAmountRaised: campaign.CurrentAmount,
                totalDonations: donations.length,
                progress: `${progress.toFixed(2)}%`
            },
            donors: donorList
        });
    } catch (error) {
        return res.status(500).json({
            message: "Unable to fetch donation details",
            error: error.message
        });
    }
};
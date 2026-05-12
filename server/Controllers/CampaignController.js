import CampaignModel from "../Models/CampaignModel.js";
import DonationModel from "../Models/DonationModel.js";
import mongoose from "mongoose";

//create campaign
export const createCampaign = async (req, res) => {
    console.log(req.body);
    try {
        const {
            Title,
            Description,
            Category,
            GoalAmount,
            DeadLine,
            ImageUrl
        } = req.body;

        if (!Title || !Description || !Category || !GoalAmount || !DeadLine || !ImageUrl) {
            return res.status(400).json({ message: "All campaign fields are required" });
        }

        const parsedGoalAmount = Number(GoalAmount);
        if (!Number.isFinite(parsedGoalAmount) || parsedGoalAmount <= 0) {
            return res.status(400).json({ message: "GoalAmount must be a positive number" });
        }

        const parsedDeadline = new Date(DeadLine);
        if (Number.isNaN(parsedDeadline.getTime())) {
            return res.status(400).json({ message: "DeadLine must be a valid date" });
        }

        if (parsedDeadline <= new Date()) {
            return res.status(400).json({ message: "DeadLine must be in the future" });
        }

        if (!String(ImageUrl).startsWith("data:image")) {
            return res.status(400).json({ message: "Invalid image format" });
        }

        const campaign = await CampaignModel.create({
            Title: String(Title).trim(),
            Description: String(Description).trim(),
            Category,
            GoalAmount: parsedGoalAmount,
            DeadLine: parsedDeadline,
            Owner: req.user.userId,
            ImageUrl: String(ImageUrl)
        });
        console.log(campaign);
        return res.status(201).json({ payload : campaign });

    } catch (error) {
        return res.status(500).json({
            message: "Campaign creation failed",
            error: error.message
        });
    }
};
//get donation list of a campaign
export const getDonationList = async (req, res) => {
    const campaignId = req.params.id;

    try {
        // ✅ Validate ID
        if (!mongoose.Types.ObjectId.isValid(campaignId)) {
            return res.status(400).json({ message: "Invalid campaign ID" });
        }

        // ✅ Campaign Info
        const campaign = await CampaignModel
            .findById(campaignId)
            .populate("Owner", "FirstName LastName Email");

        if (!campaign) {
            return res.status(404).json({ message: "Campaign not found" });
        }

        // ✅ Donations
        const donations = await DonationModel
            .find({ Campaign: campaignId })
            .populate("Donor", "FirstName LastName Email PhoneNumber")
            .sort({ createdAt: -1 });

        // ✅ Progress %
        const progress = (campaign.CurrentAmount / campaign.GoalAmount) * 100;

        // ✅ Donor List
        const donorList = donations.map(d => ({
            donorName: d.Donor
                ? `${d.Donor.FirstName} ${d.Donor.LastName}`
                : "Unknown",
            donorEmail: d.Donor?.Email,
            donorPhone: d.Donor?.PhoneNumber,
            amount: d.Amount,
            date: d.createdAt
        }));

        return res.status(200).json({
            campaign: {
                title: campaign.Title,
                description: campaign.Description,
                category: campaign.Category,
                goalAmount: campaign.GoalAmount,
                status: campaign.Status,
                deadline: campaign.DeadLine,
                owner: `${campaign.Owner?.FirstName} ${campaign.Owner?.LastName}`
            },
            stats: {
                totalAmountRaised: campaign.CurrentAmount,
                totalDonations: donations.length,
                progress: `${(Number.isFinite(progress) ? progress : 0).toFixed(2)}%`
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
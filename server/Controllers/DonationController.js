import mongoose from "mongoose";
import CampaignModel from "../Models/CampaignModel.js";
import DonationModel from "../Models/DonationModel.js";
//donate money to a campaign
export const DonationCollector = async (req, res) => {
    const { campaignId, amount } = req.body;

    try {
        if (!campaignId || !mongoose.Types.ObjectId.isValid(campaignId)) {
            return res.status(400).json({ message: "Invalid campaignId" });
        }

        const parsedAmount = Number(amount);
        if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
            return res.status(400).json({ message: "Amount must be a positive number" });
        }

        const campaign = await CampaignModel.findById(campaignId);

        if (!campaign) {
            return res.status(404).json({ message: "Campaign not found" });
        }

        // ❌ Check deadline
  
        if (new Date() > campaign.DeadLine) {
            return res.status(400).json({
                message: "Campaign has expired. Donations are closed."
            });
        }

        // ❌ Check status (extra safety)
        if (campaign.Status !== "active") {
            return res.status(400).json({
                message: "Campaign is not active"
            });
        }

        // ✅ Create donation
        const donation = await DonationModel.create({
            Donor: req.user.userId,
            Campaign: campaignId,
            Amount: parsedAmount,
            Status: "Success"
        });

        // ✅ Update campaign amount
        campaign.CurrentAmount += parsedAmount;
        campaign.Donations.push(donation._id);
        await campaign.save();

        return res.status(200).json({
            message: "Donation successful",
            donation
        });

    } catch (error) {
        return res.status(500).json({
            message: "Donation failed",
            error: error.message
        });
    }
};
//show all donations of a campaign
export const ShowDonations = async (req, res) => {
  try {
        const campaigns = await CampaignModel.find({ Status: "active" })
            .populate("Owner", "FirstName LastName")
            .populate({
                path: "Donations",
                populate: { path: "Donor", select: "FirstName LastName" }
            })
            .sort({ createdAt: -1 });

    return res.json({ campaigns });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching campaigns",
      error: error.message
    });
  }
};
  
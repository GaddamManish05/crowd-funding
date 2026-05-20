import UserModel from "../Models/UserModel.js";
import CampaignModel from "../Models/CampaignModel.js";
import DonationModel from "../Models/DonationModel.js";
//get user details
export const getUserDetails = async (req, res) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user = await UserModel.findById({ _id: userId },{Password:0,Campaigns:0});
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
    }
    catch (error) {
        return res.status(500).json({ message: "Unable to fetch user details", error: error.message });
    }
}

//get users campaigns
export const getUserCampaigns = async (req, res) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        await CampaignModel.updateMany({DeadLine:{$lt:new Date()},
            Status:"active"},
            {$set:{Status:"expired"}});

        const campaigns = await CampaignModel
            .find({ Owner: userId })
            .select("Title Description Category GoalAmount CurrentAmount Status DeadLine ImageUrl Donations")
            .sort({ createdAt: -1 });
            
        console.log('campaigns date : ',campaigns);
        return res.status(200).json({ payload : campaigns });
    }
    catch (error) {
        return res.status(500).json({ message: "Unable to fetch user campaigns", error: error.message });
    }
}
//get users donations
export const getUserDonations = async (req, res) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const donations = await DonationModel
            .find({ Donor: userId })
            .populate("Campaign","Title GoalAmount CurrentAmount").populate("Donor","FirstName LastName Email")
            .sort({ createdAt: -1 });
        return res.status(200).json({ donations });
    }
    catch (error) {
        return res.status(500).json({ message: "Unable to fetch user donations", error: error.message });
    }
}

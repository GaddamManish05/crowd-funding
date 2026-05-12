import CampaignModel from "../Models/CampaignModel.js";
import UserModel from "../Models/UserModel.js";
import DonationModel from "../Models/DonationModel.js";
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

    res.json({
      message: "Campaign approved successfully",
      payload : campaign
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

    res.json({
      message: "Campaign rejected successfully",
      payload : campaign
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
      DonationModel.aggregate([ {$group : {_id:null,total : {$sum : "$amount"}}}])
    ]);
    const totalFunds = fundsData[0]?.total || 0;
    return res.status(200).json({
      users: totalUsers,
      campaigns: totalCampaigns,
      donations: totalDonations,
      funds : totalFunds,
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

    res.json({ payload : campaigns});

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/admin/recent-donations
export const getRecentDonations = async (req, res) => {
  try {
    const donations = await DonationModel
      .find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({ payload : donations});

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getDonations = async (req, res) => {
  try {
    const donations = await DonationModel
      .find()
      .populate("campaignId", "title")
      .sort({ createdAt: -1 });
      
    res.json({ payload : donations});

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({ Role: "user" });

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

export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await UserModel.findByIdAndUpdate({userId},{IsActive : false},{new : true});
    if(!user){
      return res.status(404).json({message : "User Not Found"});
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

export const updateRole = async (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  try {
    const user = await UserModel.findByIdAndUpdate({userId},{Role : "admin"},{new : true});
    if(!user){
      return res.status(404).json({message : "User Not Found"});
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
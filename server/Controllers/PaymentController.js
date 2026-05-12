import { razorpay } from "../Database/Razorpay.js";
import crypto from "crypto";
import mongoose from "mongoose";
import CampaignModel from "../Models/CampaignModel.js";
import DonationModel from "../Models/DonationModel.js";
// Create Razorpay order
export const createOrder = async (req, res) => {
    try {
        const parsedAmount = Number(req.body.amount);
        if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
            return res.status(400).json({ message: "Amount must be a positive number" });
        }

        const options = {
            amount: Math.round(parsedAmount * 100),
            currency: "INR",
            receipt: "receipt_" + Date.now()
        };

        const order = await razorpay.orders.create(options);

        res.status(200).json(order);

    } catch (error) {
        res.status(500).json({
            message: "Error creating order",
            error: error.message
        });
    }
};
// Payment verification
export const verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            campaignId,
            amount
        } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ message: "Missing payment details" });
        }

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

        if (campaign.Status !== "active") {
            return res.status(400).json({ message: "Campaign is not active" });
        }

        if (new Date() > campaign.DeadLine) {
            return res.status(400).json({ message: "Campaign has expired" });
        }

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ message: "Invalid payment" });
        }

        const donation = await DonationModel.create({
            Donor: req.user.userId,
            Campaign: campaignId,
            Amount: parsedAmount,
            Status: "Success"
        });

        campaign.CurrentAmount += parsedAmount;
        campaign.Donations.push(donation._id);
        await campaign.save();

        res.status(200).json({
            message: "Payment successful",
            donation
        });

    } catch (error) {
        console.error("VERIFY ERROR:", error);
        res.status(500).json({
            message: "Payment verification failed",
            error: error.message
        });
    }
};
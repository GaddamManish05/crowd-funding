import { razorpay } from "../Database/Razorpay.js";
import crypto from "crypto";
import mongoose from "mongoose";
import CampaignModel from "../Models/CampaignModel.js";
import DonationModel from "../Models/DonationModel.js";
import NotificationModel from "../Models/NotificationModel.js";
import {transporter} from "../config/Nodemailer.js";
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

        return res.status(200).json(order);

    } catch (error) {
        return res.status(500).json({
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
        console.log("Razor payment details : ",razorpay_order_id,razorpay_payment_id,razorpay_signature)

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
            return res.status(404).json({message: "Campaign not found"});
        }
        
        // PREVENT SELF DONATION

        if (String(campaign.Owner)===String(req.user.userId)) {
            return res.status(400).json({message:"You cannot donate to your own campaign"});
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
        const existingDonation = await DonationModel.findOne({RazorpayPaymentId:razorpay_payment_id});
        
        if(existingDonation){
            return res.status(400).json({message: "Payment already verified"});
        }
        
        const donation = await DonationModel.create({
            Donor: req.user.userId,
            Campaign: campaignId,
            Amount: parsedAmount,
            RazorpayOrderId: razorpay_order_id,
            RazorpayPaymentId: razorpay_payment_id,
            Status: "Success"
        });
        
        campaign.CurrentAmount += parsedAmount;
        if(campaign.CurrentAmount >= campaign.GoalAmount){
            campaign.Status = "completed";
        }
        campaign.Donations.push(donation._id);
        await campaign.save();

        await NotificationModel.create({
            userId:campaign.Owner,
            title:"New Donation",
            message:`₹${parsedAmount} donated to your campaign"${campaign.Title}"`,
            type:"donation"
        });

        await NotificationModel.create({
            userId:req.user.userId,
            title:"Donation Successful",
            message:`Your donation of ₹${parsedAmount} to "${campaign.Title}" was successful`,
            type:"donation"
        });
    return res.status(200).json({
    message: "Payment verified successfully",
    payload: donation
});
setImmediate(() => {
    console.log("MAIL USER:", process.env.MAIL_USER);
    console.log("MAIL PASS EXISTS:", !!process.env.MAIL_PASS);

    console.log("TRANSPORTER:", transporter);

    transporter.sendMail({
        from:"gaddam.mani1305@gmail.com",
        to:req.user.Email,
        subject:" Donation Successful 🎉",
        html:`

<div
    style="
        background:#f4f7fb;
        padding:40px 20px;
        font-family:Arial,sans-serif;
    "
>

    <div
        style="
            max-width:600px;
            margin:auto;
            background:white;
            border-radius:18px;
            overflow:hidden;
            box-shadow:0 10px 30px rgba(0,0,0,0.08);
        "
    >

        <!-- HEADER -->

        <div
            style="
                background:linear-gradient(135deg,#0071e3,#2563eb);
                padding:35px;
                text-align:center;
                color:white;
            "
        >

            <h1
                style="
                    margin:0;
                    font-size:30px;
                "
            >

                Donation Successful 🎉

            </h1>

            <p
                style="
                    margin-top:10px;
                    opacity:0.9;
                    font-size:15px;
                "
            >

                Thank you for supporting this campaign ❤️

            </p>

        </div>

        <!-- BODY -->

        <div
            style="
                padding:40px 35px;
                color:#333;
            "
        >

            <h2
                style="
                    margin-top:0;
                    font-size:24px;
                    color:#111827;
                "
            >

                Hello ${req.user.FirstName},

            </h2>

            <p
                style="
                    line-height:1.8;
                    color:#4b5563;
                    font-size:15px;
                "
            >

                Your donation of

                <strong
                    style="
                        color:#16a34a;
                    "
                >

                    ₹${parsedAmount}

                </strong>

                to campaign

                <strong>

                    ${campaign.Title}

                </strong>

                was completed successfully.

            </p>

            <!-- INFO BOX -->

            <div
                style="
                    background:#f9fafb;
                    border:1px solid #e5e7eb;
                    border-radius:12px;
                    padding:20px;
                    margin-top:25px;
                "
            >

                <p style="margin:0 0 10px 0;">

                    <strong>
                        Campaign:
                    </strong>

                    ${campaign.Title}

                </p>

                <p style="margin:0 0 10px 0;">

                    <strong>
                        Amount:
                    </strong>

                    ₹${parsedAmount}

                </p>

                <p style="margin:0;">

                    <strong>
                        Payment ID:
                    </strong>

                    ${razorpay_payment_id}

                </p>

            </div>

            <!-- THANK YOU -->

            <p
                style="
                    margin-top:30px;
                    line-height:1.8;
                    color:#4b5563;
                    font-size:15px;
                "
            >

                Your contribution helps campaigns grow
                and empowers communities through crowdfunding 🚀

            </p>

        </div>

        <!-- FOOTER -->

        <div
            style="
                background:#f9fafb;
                padding:20px;
                text-align:center;
                color:#9ca3af;
                font-size:13px;
                border-top:1px solid #e5e7eb;
            "
        >

            CrowdFunding Platform © 2026

        </div>

    </div>

</div>

`}).then((info) => {
    console.log("MAIL SENT:", info.response);
})
.catch((err) => {
    console.log("MAIL ERROR:", err.message);
});
    });


    } catch (error) {
        console.error("VERIFY ERROR:", error);
        return res.status(500).json({
            message: "Payment verification failed",
            error: error.message
        });
    }
};

export const validateDonation = async (req, res) => {
    try {
        const { campaignId } = req.body;

        const campaign = await CampaignModel.findById(campaignId);
        if (!campaign) {
            return res.status(404).json({ message: "Campaign not found" });
        }

        // SELF DONATION CHECK
        if (String(campaign.Owner) === String(req.user.userId)) {
            return res.status(400).json({ message: "You cannot donate to your own campaign" });
        }

        // ACTIVE CHECK
        if (campaign.Status !== "active") {
            return res.status(400).json({ message: "Campaign is not active" });
        }

        // EXPIRED CHECK
        if (new Date() > campaign.DeadLine) {
            return res.status(400).json({ message: "Campaign has expired" });
        }

        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({
            message: "Validation failed",
            error: error.message
        });
    }
};
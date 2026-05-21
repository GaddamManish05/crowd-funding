// ==========================================
// 1. IMPORTS & DEPENDENCIES
// ==========================================
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../Models/UserModel.js";
import CampaignModel from "../Models/CampaignModel.js";
import DonationModel from "../Models/DonationModel.js";
import Notification from "../Models/NotificationModel.js";
import { transporter } from "../config/Nodemailer.js";
import { VerifyToken } from "../Middlewares/VerifyToken.js";
import { CheckUser } from "../Middlewares/CheckUser.js";

const CommonApi = express.Router();

const tokenCookieOptions = {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    path: "/"
};

// ==========================================
// 2. ROUTES & CORE BUSINESS LOGIC
// ==========================================

// test-email
CommonApi.get("/test-mail", async (req, res) => {
    try {
        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: process.env.MAIL_USER,
            subject: "CrowdFund Test Mail",
            text: "Nodemailer working successfully 🚀"
        });
        return res.status(200).json({ message: "Mail sent successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Mail failed", error: err.message });
    }
});

//Signup 
CommonApi.post("/signup", async (req, res) => {
    console.log("req is : ", req.body);
    const { FirstName, LastName, Email, Password, PhoneNumber } = req.body;

    try {
        if (!FirstName || !LastName || !Email || !Password || !PhoneNumber) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (String(Password).length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const normalizedEmail = String(Email).trim().toLowerCase();
        const existingUser = await UserModel.findOne({ Email: normalizedEmail });
        console.log(normalizedEmail);
        console.log(existingUser);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(Password, 10);

        const newUser = new UserModel({
            FirstName: String(FirstName).trim(),
            LastName: String(LastName).trim(),
            Email: normalizedEmail,
            Password: hashedPassword,
            PhoneNumber: String(PhoneNumber).trim()
        });

        const CreatedUser = await newUser.save();
        const CreatedUserObject = CreatedUser.toObject();
        delete CreatedUserObject.Password;
        
        transporter.sendMail({
            from: process.env.MAIL_USER,
            to: newUser.Email,
            subject: "Successfully Registered - Welcome!",
            html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;border:1px solid #e5e5e5;border-radius:10px;background-color:#f9f9f9;"><h2 style="color:#2e7d32;text-align:center;">Welcome to Our Platform 🎉</h2><p style="font-size:16px;color:#333;">Hello <strong>${newUser.FirstName}</strong>,</p><p style="font-size:15px;color:#555;line-height:1.6;">Your account has been successfully registered. We are excited to have you join us and begin your new journey.</p><div style="background-color:#ffffff;padding:15px;border-radius:8px;margin-top:20px;"><p style="margin:5px 0;"><strong>Email:</strong> ${newUser.Email}</p></div><p style="margin-top:25px;font-size:15px;color:#555;">Explore the platform and enjoy the experience 🚀</p><hr style="margin:25px 0;"/><p style="text-align:center;color:#888;font-size:13px;">Thank you for registering with us.</p></div>`
        }).then((info) => {console.log("MAIL SENT:", info.response);})
        .catch((err) => {console.log("MAIL ISSUE:", err.message);});

        return res.status(201).json({
            message: "User registered successfully",
            user: CreatedUserObject
        });
    } catch (error) {
        return res.status(500).json({ message: "Signup error", error: error.message });
    }
});

//Login Api
CommonApi.post("/login", async (req, res) => {
    console.log(req.body);
    const { Email, Password } = req.body;

    try {
        if (!Email || !Password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const normalizedEmail = String(Email).trim().toLowerCase();
        const user = await UserModel.findOne({ Email: normalizedEmail });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if(user.IsActive === false){
            return res.status(403).json({ message: "Account is deactivated. Please contact support." });
        }

        const isMatch = await bcrypt.compare(Password, user.Password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { Email: user.Email, Role: user.Role, userId: user._id, FirstName: user.FirstName, LastName: user.LastName },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        const userObj = user.toObject();
        delete userObj.Password;

        res.cookie("token", token, {
            ...tokenCookieOptions,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        .json({
            message: "Login successful",
            payload: userObj
        });
    } catch (error) {
        return res.status(500).json({ message: "Login error", error: error.message });
    }
});

//logout users
CommonApi.post("/logout", (req, res) => {
    res.clearCookie("token", tokenCookieOptions);
    res.json({ message: "Logout successful" });
});

// get All Campaigns
CommonApi.get("/campaigns", VerifyToken, async (req, res) => {
    try {
        await CampaignModel.updateMany(
            { DeadLine: { $lt: new Date() }, Status: { $nin: ["completed", "reject", "expired"] } },
            { $set: { Status: "expired" } }
        );

        const campaigns = await CampaignModel.find({ DeadLine: { $gte: new Date() },Status : "active",IsActive:true})
            .select("Title Description Category GoalAmount CurrentAmount Status DeadLine ImageUrl")
            .sort({ createdAt: -1 })
            .populate("Owner", "FirstName LastName Email");

        return res.status(200).json({ payload: campaigns });
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching campaigns",
            error: error.message
        });
    }
});

CommonApi.get('/check-auth', VerifyToken, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.userId).select("-Password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "Authenticated", payload: user });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server Error" });
    }
});

CommonApi.get('/profile-stats', VerifyToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        console.log(userId);
        
        // total successful donations
        const donationCount = await DonationModel.countDocuments({
            Donor: userId,
            Status: "Success"
        });

        // participated campaigns
        const participatedCampaigns = await DonationModel.distinct(
            "Campaign",
            {
                Donor: userId,
                Status: "Success"
            }
        );

        // created campaigns
        const createdCampaignCount = await CampaignModel.countDocuments({
            CreatedBy: userId
        });
        console.log("count : ", createdCampaignCount);
        
        return res.status(200).json({
            message: "Dashboard stats fetched",
            payload: {
                donationCount,
                participatedCampaignCount: participatedCampaigns.length,
                createdCampaignCount
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Failed to fetch dashboard stats"
        });
    }
});

CommonApi.get("/notifications", VerifyToken, async (req, res) => {
    const notifications = await Notification.find({
        userId: req.user.userId
    })
    .sort({ createdAt: -1 });
    console.log("notifications : ", notifications);
    return res.json({
        payload: notifications
    });
});

CommonApi.put("/notifications/:id/read", VerifyToken, async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            { isRead: true },
            { new: true }
        );

        return res.status(200).json({
            payload: notification
        });
    } catch (error) {
        return res.status(500).json({
            message: "Unable to update notification",
            error: error.message
        });
    }
});


CommonApi.put("/change-password", VerifyToken, async (req, res) => {
    try {
        const userId = req.user?.userId;
        const { currentPassword, newPassword, confirmPassword } = req.body;

        // REQUIRED FIELDS
        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: "All password fields are required" });
        }

        // PASSWORD MATCH CHECK
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "New passwords do not match" });
        }

        // PASSWORD LENGTH CHECK
        if (newPassword.length < 6) {
            return res.status(400).json({ message: "Password must contain at least 6 characters" });
        }

        // FIND USER
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // VERIFY CURRENT PASSWORD
        const isPasswordValid = await bcrypt.compare(currentPassword, user.Password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }

        // PREVENT SAME PASSWORD
        const isSamePassword = await bcrypt.compare(newPassword, user.Password);
        if (isSamePassword) {
            return res.status(400).json({ message: "New password cannot be same as current password" });
        }

        // HASH NEW PASSWORD
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // UPDATE PASSWORD
        user.Password = hashedPassword;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password updated successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Unable to change password",
            error: error.message
        });
    }
});
// ==========================================
// 3. EXPORTS
// ==========================================
export default CommonApi;
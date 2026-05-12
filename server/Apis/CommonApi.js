import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../Models/UserModel.js";
import CampaignModel from "../Models/CampaignModel.js";
import { VerifyToken } from "../Middlewares/VerifyToken.js";
import { CheckUser } from "../Middlewares/CheckUser.js";
const CommonApi = express.Router();
const tokenCookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/"
};

//Signup 
CommonApi.post("/signup", async (req, res) => {
  console.log("req is : ",req.body);
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

    res.status(201).json({
      message: "User registered successfully",
      user: CreatedUserObject
    });

  } catch (error) {
    res.status(500).json({ message: "Signup error", error: error.message });
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

    const isMatch = await bcrypt.compare(Password, user.Password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { Email: user.Email, Role: user.Role, userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res
      .cookie("token", token, {
        ...tokenCookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000
      })
      .json({
        message: "Login successful",
        payload: user
      });

  } catch (error) {
    res.status(500).json({ message: "Login error", error: error.message });
  }
});
//logout users
CommonApi.post("/logout", (req, res) => {
  res.clearCookie("token", tokenCookieOptions);
  res.json({ message: "Logout successful" });
}
);

// get All Campaigns

CommonApi.get("/campaigns", VerifyToken, CheckUser, async (req, res) => {
  try {
    const campaigns = await CampaignModel
      .find({ Status: "active" })
      .populate("Owner", "FirstName LastName Email");

    res.status(200).json({ payload : campaigns });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching campaigns",
      error: error.message
    });
  }
});
export default CommonApi;
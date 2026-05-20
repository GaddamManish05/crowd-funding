// ==========================================
// 1. IMPORTS & DEPENDENCIES
// ==========================================
import { Schema, model } from "mongoose";

// ==========================================
// 2. MONGOOSE SCHEMA CONFIGURATION
// ==========================================
const DonationSchema = new Schema({
    Donor: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    Campaign: {
        type: Schema.Types.ObjectId,
        ref: "Campaign",
        required: true
    },
    Amount: {
        type: Number,
        required: true,
        min: 1
    },
    RazorpayOrderId: {
        type: String,
        required: true,
        trim: true
    },
    RazorpayPaymentId: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    Status: {
        type: String,
        enum: [
            "Success",
            "Failed",
            "Pending"
        ],
        default: "Pending"
    }
}, {
    timestamps: true,
    strict: "throw"
});

// ==========================================
// 3. EXPORTS & MODEL GENERATION
// ==========================================
const DonationModel = model("Donation", DonationSchema);

export default DonationModel;
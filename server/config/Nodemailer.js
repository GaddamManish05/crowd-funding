// ==========================================
// 1. IMPORTS & DEPENDENCIES
// ==========================================
import nodemailer from "nodemailer";

// ==========================================
// 2. CONFIGURATION & CONSTANTS
// ==========================================
const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },

    pool: true,

    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000
});
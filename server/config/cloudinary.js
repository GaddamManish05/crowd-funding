// ==========================================
// 1. IMPORTS & DEPENDENCIES
// ==========================================
import { v2 as cloudinary } from "cloudinary";

// ==========================================
// 2. CONFIGURATION & CONSTANTS
// ==========================================
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// ==========================================
// 3. EXPORTS
// ==========================================
export default cloudinary;
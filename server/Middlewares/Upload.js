// ==========================================
// 1. IMPORTS & DEPENDENCIES
// ==========================================
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// ==========================================
// 2. CONFIGURATION & STORAGE SETUP
// ==========================================

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => ({
        folder: "crowdfunding",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        public_id: Date.now() + "-" + file.originalname.split(".")[0]
    })
});

// ==========================================
// 3. HELPER FUNCTIONS / UTILITIES
// ==========================================

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp"
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"), false);
    }
};

// ==========================================
// 4. CORE MULTER EXPORT
// ==========================================

export const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    },
    fileFilter
});
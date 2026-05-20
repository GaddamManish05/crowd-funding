import express from "express";
import { connectDB } from "./Database/db.js";
//import routes
import DonorApi from "./Apis/DonorApi.js";
import CommonApi from "./Apis/CommonApi.js";
import CampaignApi from "./Apis/CampaignApi.js";
import AdminApi from "./Apis/AdminApi.js";
import UserApi from "./Apis/UserApi.js";
import PaymentApi from "./Apis/PaymentApi.js";
//import middlewares
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 4000;

//middlewares
app.use(cors({
  origin: ["http://localhost:5173",
  "https://crowd-funding-fw34.vercel.app"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", 1);
app.use(helmet());


//routes
app.use("/user-api", UserApi);
app.use("/donation-api", DonorApi);
app.use("/common-api", CommonApi);
app.use("/campaign-api", CampaignApi);
app.use("/admin-api", AdminApi);
app.use("/payment-api", PaymentApi);

//error handling middleware
app.use((err, req, res, next) => {

    if (err.name === "ValidationError") {
        return res.status(400).json({ message: "validation failed" });
    }

    if (err.name === "CastError") {
        return res.status(400).json({ message: "invalid id" });
    }

    if (err.code === 11000) {
        return res.status(409).json({ message: "duplicate key error" });
    }

    res.status(500).json({ message: "internal server error", error: err.message });

});


//connect DB and start server
const startServer = async () => {

    try {

        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } 
    catch (err) {
        console.log("Failed to connect to database", err);
        process.exit(1);

    }

};

startServer();
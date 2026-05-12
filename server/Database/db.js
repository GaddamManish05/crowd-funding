import { connect } from "mongoose";
import { config } from "dotenv";
config();
export const connectDB = async () => {
    try {
        await connect(process.env.DB_URL);
        console.log("DB Connected");
    } catch (err) {
        console.log("DB connection failed", err);
        process.exit(1);
    }
};
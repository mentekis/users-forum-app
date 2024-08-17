import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDb = async () => {
  await mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => console.log("MongoDB succesfully connected"))
    .catch((err) => console.log("MongoDB connection failed", err));
};

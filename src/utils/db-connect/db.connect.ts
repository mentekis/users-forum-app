import mongoose from "mongoose";
import { env } from "../envalid/env";

export const connectDb = async () => {
  return await mongoose
    .connect(env.MONGO_URI)
    .then(() => console.log("MongoDB succesfully connected"))
    .catch((err) => console.log("MongoDB connection failed", err));
};

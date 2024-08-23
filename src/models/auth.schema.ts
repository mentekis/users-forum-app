import { Schema, model } from "mongoose";

const userAuth = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  refreshToken: String,
});

export const UserAuth = model("UserAuth", userAuth);

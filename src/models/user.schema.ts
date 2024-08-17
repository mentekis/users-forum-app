import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: String,
  city: String,
});

export const User = model("User", userSchema);

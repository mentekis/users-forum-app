import { Schema, model } from "mongoose";

// Schema
const userSchema = new Schema(
  {
    name: String,
    city: String,
  },
  // to disable default versionKey '__v: 0'
  { versionKey: false },
);

// Collection
export const User = model("User", userSchema);

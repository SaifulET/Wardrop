import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  name: { type: String },
  otp: { type: String },
  otpExpires: { type: Date },
}, { timestamps: true });



export default model("Admin", userSchema);
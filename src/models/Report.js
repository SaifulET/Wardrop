import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // who reported
  targetUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // always stored
  targetCommunity: { type: mongoose.Schema.Types.ObjectId, ref: "Outfit", default: null }, // if reportType = post
  reason: { type: String, required: true },
  reportType: { type: String, enum: ["profile", "post"], required: true },
  status: { type: String, enum: ["pending", "Banned"], default: "pending" },
  reportedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model("Report", ReportSchema);

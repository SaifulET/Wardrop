import mongoose from "mongoose";

const AffiliatedSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    link: { type: String },
    status: { type: String, enum: ["active", "hold"], default: "active" }, // admin decides
    read: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("affiliatedSchema", AffiliatedSchema);

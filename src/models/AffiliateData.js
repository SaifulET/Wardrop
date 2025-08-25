import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    adminMessage: {
      title: String,
      description: String,
      image: String,
      link: String
    },
    status: { type: String, enum: ["active", "hold"], default: "hold" }, // per user
    read: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("AdminNotification", notificationSchema);

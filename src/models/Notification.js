import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  planner: { type: mongoose.Schema.Types.ObjectId, ref: "Planner", default: null },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Outfit", default: null },
  // adminMessage: { type: mongoose.Schema.Types.ObjectId, ref: "AdminMessage", default: null },
  adminMessage:{type:String},
  read: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("Notification", notificationSchema);

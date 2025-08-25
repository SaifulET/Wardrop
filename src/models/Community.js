import mongoose from "mongoose";

const CommunitySchema = new mongoose.Schema({
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  post: { type: mongoose.Schema.Types.ObjectId, ref: "Outfit", required: true, unique: true },

  reactions: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      type: { type: String, enum: ["like","love","haha","wow","sad","angry"] },
      reactedAt: { type: Date, default: Date.now }
    }
  ],

  reports: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      message: { type: String, required: true },
      reportedAt: { type: Date, default: Date.now }
    }
  ]

}, { timestamps: true });

export default mongoose.model("Community", CommunitySchema);

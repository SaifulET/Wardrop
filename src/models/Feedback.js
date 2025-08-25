import mongoose from "mongoose";
const { Schema } = mongoose;

const feedbackSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    time: { type: Date, default: Date.now } 
  },
  { timestamps: true }
);

export default mongoose.model("Feedback", feedbackSchema);

import mongoose from "mongoose";
const { Schema } = mongoose;

const outfitSchema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String,  }, // saved image URL
    season: { type: [String], default: [] }, // e.g. ["Summer", "Winter"]
    style: { type: mongoose.Schema.Types.ObjectId, ref: "Style" },  // e.g. ["Casual", "Formal"]
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    usage:{ type: Number, default: 0 },
    active:{type:Boolean,default:true}
  },
  { timestamps: true }
);

// Prevent duplicate title+image for same user
outfitSchema.index({ user: 1, title: 1, image: 1 }, { unique: true });

export default mongoose.model("Outfit", outfitSchema);

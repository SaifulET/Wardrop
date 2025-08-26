import { Schema, model } from "mongoose";

const itemSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  brand: { type: String },
  category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  material: [{ type: Schema.Types.ObjectId, ref: "Material"}],        
  colors: [String],
  season: [String],
  style: [String],
  image: { type: String }
}, { timestamps: true });

export default model("Item", itemSchema);

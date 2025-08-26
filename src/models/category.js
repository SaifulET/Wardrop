import { Schema, model } from "mongoose";
const CategorySchema = new Schema({
  // user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: String, required: true,unique: true },
  subCategory: { type: String ,unique: true },
  subsubCategory: { type: String, unique: true }, 
  items: { type: Schema.Types.ObjectId, ref: "Item" }
}, { timestamps: true });

export default model("categories", CategorySchema);

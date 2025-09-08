import { Schema, model } from "mongoose";

const itemSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String,required: true},
  brand: { type: String ,required: true},
  category: [{ type: Schema.Types.ObjectId, ref: "Category" ,required: true}],
  material: [{ type: Schema.Types.ObjectId, ref: "Material"}],        
  colors: [String],
  season: [String],
  style: [String],
  image: { type: String ,required: true}
}, { timestamps: true });

export default model("Item", itemSchema);

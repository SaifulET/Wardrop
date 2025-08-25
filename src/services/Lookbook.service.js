import { Lookbook } from "../models/Lookbook.js";

// Create
export const createLookbook = async (data, userId) => {
 

    const lookbook = new Lookbook({ ...data, user: userId });
    return await lookbook.save();
 
};

// Get All for a user
export const getLookbooks = async (userId) => {
  return await Lookbook.find({ user: userId })
    .populate("items")
    .populate("outfits");
};

// Get single
export const getLookbookById = async (id, userId) => {
  return await Lookbook.findOne({ _id: id, user: userId })
    .populate("items")
    .populate("outfits");
};

// Update name/details
export const updateLookbook = async (id, data, userId) => {
  return await Lookbook.findOneAndUpdate(
    { _id: id, user: userId },
    { $set: data },
    { new: true }
  );
};

// Delete
export const deleteLookbook = async (id, userId) => {
  return await Lookbook.findOneAndDelete({ _id: id, user: userId });
};

// Add items/outfits
export const addToLookbook = async (id, data, userId) => {
  return await Lookbook.findOneAndUpdate(
    { _id: id, user: userId },
    { $addToSet: { items: { $each: data.items || [] }, outfits: { $each: data.outfits || [] } } },
    { new: true }
  ).populate("items").populate("outfits");
};

// Remove items/outfits
export const removeFromLookbook = async (id, data, userId) => {
  return await Lookbook.findOneAndUpdate(
    { _id: id, user: userId },
    { $pull: { items: { $in: data.items || [] }, outfits: { $in: data.outfits || [] } } },
    { new: true }
  ).populate("items").populate("outfits");
};

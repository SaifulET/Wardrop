import Community from "../models/Community.js";
import Outfit from "../models/Outfit.js";
import Style from "../models/Style.js";
import User from "../models/User.js";
import { createNotification } from "./Notification.service.js";

// Create Outfit
export const createOutfit = async (userId, data) => {
  const { title, image, season, style } = data;

    const styles = await Style.find({ name: { $in: style } }, "_id");
    
  
  const  styleIds = styles.map(s => s._id);

  // Check duplicate for same user
  const exists = await Outfit.findOne({ user: userId, title, image });
  if (exists) {
    throw new Error("Outfit with same title and image already exists for this user");
  }

  const outfit = new Outfit({ user: userId, title, image, season, style: styleIds});
  await Community.create({post:outfit._id, user:userId })


 const user = await User.findById(userId).populate("followers", "_id");
  const followerIds = user.followers.map(f => f._id);

  // Notify followers
  for (const fid of followerIds) {
    await createNotification({
      userId: fid,
      postId: outfit._id
    });
  }




  return await outfit.save();
};

// Get all outfits of a user
export const getUserOutfits = async (userId) => {
  return await Outfit.find({ user: userId }).lean();
};

// Get single outfit details
export const getOutfitById = async (outfitId, userId) => {
  return await Outfit.findOne({ _id: outfitId, user: userId }).lean();
};

// Update Outfit
export const updateOutfit = async (outfitId, userId, data) => {
  const { title, image } = data;

  // Prevent duplicate check on update
  if (title && image) {
    const duplicate = await Outfit.findOne({
      _id: { $ne: outfitId },
      user: userId,
      title,
      image,
    });
    if (duplicate) throw new Error("Outfit with same title and image already exists");
  }

  return await Outfit.findOneAndUpdate(
    { _id: outfitId, user: userId },
    { $set: data },
    { new: true }
  );
};

// Delete Outfit
export const deleteOutfit = async (outfitId, userId) => {
  return await Outfit.findOneAndDelete({ _id: outfitId, user: userId });
};

import Outfit from "../models/Outfit.js";
import Item from "../models/Item.js";
import {Lookbook} from "../models/Lookbook.js";
import User from "../models/User.js";

// Fetch all users with details
export const getAllUsersService = async () => {
  try {
    const users = await User.find({})
      .select("_id username email name bio dob location gender profileImage disabled") // exclude version & password
      .lean(); // plain JS objects, better performance

    return users;
  } catch (err) {
    throw new Error("Error fetching users: " + err.message);
  }
};

export const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error("Failed to fetch user: " + error.message);
  }
};







export const getUserStatsService = async (userId) => {
  const [outfitCount, itemCount, lookbookCount, user] = await Promise.all([
    Outfit.countDocuments({ user: userId }),
    Item.countDocuments({ user: userId }),
    Lookbook.countDocuments({ user: userId }),
    User.findById(userId).select("followers following"),
  ]);

  return {
    outfitCount,
    itemCount,
    lookbookCount,
    followersCount: user?.followers?.length || 0,
    followingCount: user?.following?.length || 0,
  };
};

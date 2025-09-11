import User from "../models/User.js";

// 1. Get following info
export const getFollowingService = async (userId) => {
  const user = await User.findById(userId).populate("following", "_id name username email profileImage");
  if (!user) throw new Error("User not found");
  return user.following;
};

// 2. Get followers info
export const getFollowersService = async (userId) => {
  const user = await User.findById(userId).populate("followers", "_id name username email profileImage");
  if (!user) throw new Error("User not found");
  return user.followers;
};

// 3. Get non-connected users (not followers and not followed by me)
export const getNonConnectedUsersService = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const excludedIds = [...user.followers, ...user.following, user._id]; // exclude followers, following & self
  const nonConnectedUsers = await User.find({ _id: { $nin: excludedIds } })
    .select("_id name username email profileImage");

  return nonConnectedUsers;
};

import User from "../models/User.js";

// Block user
export const blockUser = async (userId, targetUserId) => {
  if (userId === targetUserId) throw new Error("You cannot block yourself");

  const user = await User.findById(userId);
  const targetUser = await User.findById(targetUserId);

  if (!user || !targetUser) throw new Error("User not found");

  // If already blocked
  if (user.blockedUsers.includes(targetUserId)) {
    throw new Error("User already blocked");
  }

  // Add to blockedUsers
  user.blockedUsers.push(targetUserId);

  // Remove from following/followers if exists
  user.following = user.following.filter(f => f.toString() !== targetUserId.toString());
  user.followers = user.followers.filter(f => f.toString() !== targetUserId.toString());

  targetUser.following = targetUser.following.filter(f => f.toString() !== userId.toString());
  targetUser.followers = targetUser.followers.filter(f => f.toString() !== userId.toString());

  await user.save();
  await targetUser.save();

  return { message: "User blocked successfully", user };
};

// Unblock user
export const unblockUser = async (userId, targetUserId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  user.blockedUsers = user.blockedUsers.filter(b => b.toString() !== targetUserId.toString());

  await user.save();

  return { message: "User unblocked successfully", user };
};





// Get all blocked users with details
export const getBlockedUsers = async (userId) => {
  const user = await User.findById(userId).populate(
    "blockedUsers",
    "name username profileImage"
  );

  if (!user) throw new Error("User not found");

  return user.blockedUsers;
};

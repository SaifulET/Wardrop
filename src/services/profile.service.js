import User from "../models/User.js";

export const getUserProfile = async (userId) => {
    
  const user = await User.findById(userId).select("-password");
  if (!user) throw new Error("User not found");
  return user;
};
export const updateProfile = async (userId, jsonData,file) => {
  
   const  updateData= JSON.parse(jsonData);
   
  const user = await User.findById(userId)



  if (!user) {
    throw new Error("User not found");
  }

  // If image is provided

  if (file) {
    // Local storage example
    const imagePath = `/uploads/profile/${file.filename}`;
  
    user.profileImage = imagePath;
  }

  // Update only provided fields (PATCH behavior)
  if (updateData.name) user.name = updateData.name;
  if (updateData.bio) user.bio = updateData.bio;
  if (updateData.phone)user.phone = updateData.phone;
  await user.save();
  return user;
};


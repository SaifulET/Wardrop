import * as profileService from "../services/profile.service.js";

export const getProfile = async (req, res, next) => {
  try {
    const profile = await profileService. getUserProfile(req.headers.user_id);
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.headers.user_id;
    const updateData = req.body.data; // Assuming the update data is in the request body
    const file = req.file;
    console.log(updateData,file,"lkdsjldj")
    // Assuming multer middleware is used to handle file uploads
    const updatedProfile = await profileService.updateProfile(userId, updateData, file);
    res.json(updatedProfile);
  } catch (error) {
    next(error.message);
  }
};

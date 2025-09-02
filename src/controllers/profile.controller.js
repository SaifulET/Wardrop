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

    const updateData = req.body; // Assuming the update data is in the request body
    if(req.file){
        const updatedProfile = await profileService.updateProfile(userId, req.body.data,req.file);
      res.json(updatedProfile);
    }
    
    
    // console.log(updateData,file,"line at 17",req.body)
    // Assuming multer middleware is used to handle file uploads
    // console.log(userId)
    else{
      const updatedProfile = await profileService.updateProfile(userId, req.body.data);
    res.json(updatedProfile);
    }
    
  } catch (error) {
    next(error.message);
  }
};

import Planner from "../models/Planner.js";
import { schedulePlannerNotification } from "../utils/SchedulePlanner.js";

export const createPlanner = async (outfitId,time,userId) => {
  
  const exists = await Planner.findOne({
    user: userId,
    outfit: outfitId,
    settingTime: time,
  });
  if (exists) {
    throw new Error("Planner with same outfit and time already exists.");
  }

  const planner = new Planner({user:userId, outfit: outfitId, settingTime: time,});
   schedulePlannerNotification(planner);
  return await planner.save();
};


export const getAllPlanners= async(userId)=>{

    return await Planner.find({user:userId})
        .populate("outfit","title image")

}


export const getPlannerById = async (plannerId) => {
  return await Planner.findById(plannerId)
    .populate("user", "name profileImage")
    .populate("outfit", "title image");
};


export const updatePlannerTime = async (plannerId, userId, newTime) => {
  const planner = await Planner.findOneAndUpdate(
    { _id: plannerId, user: userId },
    { settingTime: newTime },
    { new: true }
  )
    .populate("user", "name profileImage")
    .populate("outfit", "title image");

  return planner;
};



export const deletePlanner = async (plannerId, userId) => {
  return await Planner.findOneAndDelete({
    _id: plannerId,
    user: userId, 
  });
};
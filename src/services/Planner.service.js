import Planner from "../models/Planner.js";
import { schedulePlannerNotification } from "../utils/SchedulePlanner.js";

export const createPlanner = async (outfitId, date, time, userId) => {
  // Check duplicate for same user, outfit, date, and time
  const exists = await Planner.findOne({
    user: userId,
    outfit: outfitId,
    date,
    time,
  });
  if (exists) {
    throw new Error("Planner with same outfit, date, and time already exists.");
  }

  const planner = new Planner({ user: userId, outfit: outfitId, date, time });
  schedulePlannerNotification(planner); // schedule using separate date & time

  const savedPlanner = await planner.save();

  // Populate user info and outfit style names
  const populatedPlanner = await Planner.findById(savedPlanner._id)
    .populate("user", "name profileImage")
    .populate({
      path: "outfit",
      populate: { path: "style", select: "name" }, // style names
      select: "title image style",
    });

  return populatedPlanner;
};

export const getAllPlanners = async (userId) => {
  return await Planner.find({ user: userId })
    .populate("outfit", "title image style")
    .populate({
      path: "outfit",
      populate: { path: "style", select: "name" }, // populate style names
    });
};

export const getPlannerById = async (plannerId) => {
  return await Planner.findById(plannerId)
    .populate("user", "name profileImage")
    .populate({
      path: "outfit",
      select: "title image style",
      populate: { path: "style", select: "name" },
    });
};

export const updatePlannerTime = async (plannerId, userId, newDate, newTime) => {
  const planner = await Planner.findOneAndUpdate(
    { _id: plannerId, user: userId },
    { date: newDate, time: newTime },
    { new: true }
  )
    .populate("user", "name profileImage")
    .populate({
      path: "outfit",
      select: "title image style",
      populate: { path: "style", select: "name" },
    });

  return planner;
};

export const deletePlanner = async (plannerId, userId) => {
  return await Planner.findOneAndDelete({
    _id: plannerId,
    user: userId,
  });
};

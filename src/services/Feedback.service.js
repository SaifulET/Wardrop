import Feedback from "../models/Feedback.js";
import { createAdminNotification } from "./AdminNotification.services.js";

// Create feedback
export const createFeedback = async (userId, data) => {
  const { title, message } = data;
  const feedback = new Feedback({ user: userId, title, message });
  await createAdminNotification({
      userId,
      FeedbackId: feedback._id
    });
  return await feedback.save();
};

// Get all feedback (admin purpose)
export const getAllFeedback = async () => {
  const allFeedback= await Feedback.find().populate('user', 'name username email').lean();
    
  return allFeedback;
};

// Get feedback by user
export const getUserFeedback = async (userId) => {
  return await Feedback.find({ user: userId }).lean();
};

// Delete feedback by id
export const deleteFeedback = async (feedbackId, userId) => {
  return await Feedback.findOneAndDelete({ _id: feedbackId, user: userId });
};

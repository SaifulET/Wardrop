import Feedback from "../models/Feedback.js";

// Create feedback
export const createFeedback = async (userId, data) => {
  const { title, message } = data;
  const feedback = new Feedback({ user: userId, title, message });
  return await feedback.save();
};

// Get all feedback (admin purpose)
export const getAllFeedback = async () => {
  return await Feedback.find().populate("user", "name").lean();
};

// Get feedback by user
export const getUserFeedback = async (userId) => {
  return await Feedback.find({ user: userId }).lean();
};

// Delete feedback by id
export const deleteFeedback = async (feedbackId, userId) => {
  return await Feedback.findOneAndDelete({ _id: feedbackId, user: userId });
};

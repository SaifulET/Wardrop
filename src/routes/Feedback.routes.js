import express from "express";
import {
  createFeedbackController,
  getAllFeedbackController,
  getUserFeedbackController,
  deleteFeedbackController,
} from "../controllers/Feedback.controller.js";
import {authCheck} from "../middlewares/auth.middleware.js"

const FeedbackRoute = express.Router();

// Routes
FeedbackRoute.post("/createFeedback",authCheck,  createFeedbackController);
FeedbackRoute.get("/GetAllFeedback", authCheck, getAllFeedbackController); // admin can use
FeedbackRoute.get("/GetUserFeedback", authCheck, getUserFeedbackController); // user own feedback
FeedbackRoute.delete("/deleteFeedback/:id", authCheck, deleteFeedbackController);

export default FeedbackRoute;

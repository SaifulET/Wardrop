import express from "express";
import { getAllUsersController, getUserByIdController, getUserStatsController, ToggleUserStatus } from "../controllers/UserDetailsManagement.controller.js";
import { authCheck } from "../middlewares/auth.middleware.js";

const UserDetailsRoute = express.Router();

// GET /api/users → fetch all users
UserDetailsRoute.get("/UserDetails",authCheck, getAllUsersController);
UserDetailsRoute.get("/specificUserDetails/:id",authCheck, getUserByIdController);
UserDetailsRoute.get("/outfitItemLookbookCount/:userId",authCheck, getUserStatsController);
UserDetailsRoute.post("/userStatusToggle",authCheck, ToggleUserStatus);


export default UserDetailsRoute;

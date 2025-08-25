import express from "express";
import { getAllStats,getUserActivityController } from "../controllers/Dashboard.controller.js";
import {authCheck} from "../middlewares/auth.middleware.js"

const Dashboardroute = express.Router();

Dashboardroute.get("/dashboardStats",authCheck, getAllStats);
Dashboardroute.get("/UserActivity/:keyword",authCheck, getUserActivityController);

export default Dashboardroute;

import express from "express";

import { authCheck } from "../middlewares/auth.middleware.js";
import { getAdminNotificationscontroller, markAdminNotificationReadController } from "../controllers/AdminNotification.controller.js";

const AdminNotificationRoute = express.Router();



AdminNotificationRoute.get("/GetAllAdminNotification",authCheck, getAdminNotificationscontroller);
AdminNotificationRoute.patch("/ReadAdminNotification/:id",authCheck, markAdminNotificationReadController);

export default AdminNotificationRoute;

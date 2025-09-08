import express from "express";
import { signup, signin, forgotPassword, googleLogin,  signout, updateAdminProfileController, VerifyAdminEmail, resetAdminPasswordController, getAdminProfileController } from "../controllers/AdminAuth.controller.js";
import {authCheck}from"../middlewares/auth.middleware.js"
import { uploadMiddleware } from "../middlewares/awsUpload.middleware.js";

const AdminAuthRoutes = express.Router();


AdminAuthRoutes.post("/signin", signin)
AdminAuthRoutes.post("/signup",signup )
AdminAuthRoutes.post("/ProfileUpdate",authCheck,uploadMiddleware.array("images", 10),updateAdminProfileController )
AdminAuthRoutes.post("/forgot-password",forgotPassword )
AdminAuthRoutes.post("/reset-password", resetAdminPasswordController)
AdminAuthRoutes.post("/verifyAdminEmail", VerifyAdminEmail)
AdminAuthRoutes.post("/google",googleLogin )
AdminAuthRoutes.get("/signout",authCheck, signout)
AdminAuthRoutes.get("/GetAdminProfile",authCheck,getAdminProfileController )




export default AdminAuthRoutes;



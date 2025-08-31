import express from "express";
import { signup, signin, forgotPassword, googleLogin,  signout, updateAdminProfileController, VerifyAdminEmail, resetAdminPasswordController } from "../controllers/AdminAuth.controller.js";
import { conditionalUpload } from "../middlewares/multer.middleware.js";
import {authCheck}from"../middlewares/auth.middleware.js"

const AdminAuthRoutes = express.Router();


AdminAuthRoutes.post("/signin", signin)
AdminAuthRoutes.post("/signup",signup )
AdminAuthRoutes.post("/ProfileUpdate",authCheck,conditionalUpload,updateAdminProfileController )
AdminAuthRoutes.post("/forgot-password",forgotPassword )
AdminAuthRoutes.post("/reset-password", resetAdminPasswordController)
AdminAuthRoutes.post("/verifyAdminEmail", VerifyAdminEmail)
AdminAuthRoutes.post("/google",googleLogin )
AdminAuthRoutes.get("/signout",authCheck, signout)



export default AdminAuthRoutes;



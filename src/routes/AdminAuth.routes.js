import express from "express";
import { signup, signin, forgotPassword, resetPassword, googleLogin,  signout, updateAdminProfileController } from "../controllers/AdminAuth.controller.js";
import { conditionalUpload } from "../middlewares/multer.middleware.js";
import {authCheck}from"../middlewares/auth.middleware.js"

const AdminAuthRoutes = express.Router();


AdminAuthRoutes.post("/signin", signin)
AdminAuthRoutes.post("/signup",signup )
AdminAuthRoutes.post("/ProfileUpdate",authCheck,conditionalUpload,updateAdminProfileController )
AdminAuthRoutes.post("/forgot-password",forgotPassword )
AdminAuthRoutes.post("/reset-password", resetPassword)
AdminAuthRoutes.post("/google",googleLogin )
AdminAuthRoutes.get("/signout",authCheck, signout)



export default AdminAuthRoutes;



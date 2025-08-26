import express from "express";
import { signup, signin, forgotPassword, resetPassword, googleLogin, appleLogin, signout, verifyOtpController } from "../controllers/auth.controller.js";
import { authCheck } from "../middlewares/auth.middleware.js";
const authRoutes = express.Router();



authRoutes.post("/signup",signup )
authRoutes.post("/signin", signin)
authRoutes.post("/forget-password",forgotPassword )
authRoutes.post("/verifyOtp",verifyOtpController )

authRoutes.post("/reset-password", resetPassword)
authRoutes.post("/google",googleLogin )
authRoutes.post("/apple", appleLogin )
authRoutes.get("/signout",authCheck, signout)



export default authRoutes;



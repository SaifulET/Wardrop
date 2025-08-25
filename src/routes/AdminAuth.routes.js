import express from "express";
import { signup, signin, forgotPassword, resetPassword, googleLogin,  signout } from "../controllers/AdminAuth.controller.js";

const AdminAuthRoutes = express.Router();


AdminAuthRoutes.post("/signin", signin)
AdminAuthRoutes.post("/signup",signup )
AdminAuthRoutes.post("/forgot-password",forgotPassword )
AdminAuthRoutes.post("/reset-password", resetPassword)
AdminAuthRoutes.post("/google",googleLogin )
AdminAuthRoutes.get("/signout", signout)



export default AdminAuthRoutes;



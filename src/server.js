import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/Profile.routes.js";
import itemsRoutes from "./routes/item.routes.js";
import OutfitRoutes from "./routes/outfit.routes.js";
import LookbookRoutes from "./routes/Lookbook.routes.js";
import WishListRoutes from "./routes/WishList.routes.js";
import CommunityRoutes from "./routes/Community.routes.js";
import PlannerRoutes from "./routes/Planner.route.js";
import DressMeRoutes from "./routes/DressMe.routes.js";
import FeedbackRoute from "./routes/Feedback.routes.js";
import FollowAndUnfollowRoute from "./routes/FollowAndUnfollow.routes.js";
import BlockRoute from "./routes/Blocked.routes.js";
import NotificationRoute from "./routes/Notification.routes.js";
import { initSocket } from "./socket.js";
import http from "http";
import DeleteAccount from "./routes/DeleteAccount.routes.js";
import PrivacyRoute from "./routes/Privacy.routes.js";
import AdminAuthRoutes from "./routes/AdminAuth.routes.js";
import Dashboardroute from "./routes/Dashboard.routes.js";
import UserDetailsRoute from "./routes/UserDetailsManagement.route.js";
import ReportRoute from "./routes/Report.routes.js";
import StyleRoute from "./routes/Style.routes.js";




dotenv.config();
const app = express();
const server = http.createServer(app);
const io = initSocket(server);


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors({ origin: true, credentials: true }));
app.use(morgan("dev"));
app.use(helmet());






// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// Routes placeholder
app.use("/auth",authRoutes);
app.use("/profile",profileRoutes);
app.use("/items",itemsRoutes);  
app.use("/outfits", OutfitRoutes);
app.use("/DressMe", DressMeRoutes);
app.use("/lookbook", LookbookRoutes); 
app.use("/wishlist",WishListRoutes)
app.use("/community",CommunityRoutes)
app.use("/planner",PlannerRoutes);
app.use("/Feedback",FeedbackRoute)
app.use("/followAndUnfollow",FollowAndUnfollowRoute)
app.use("/blocked",BlockRoute)
app.use("/Notification",NotificationRoute)
app.use("/DeleteAccount",DeleteAccount)
app.use("/privacy",PrivacyRoute)
app.use("/dashboard",Dashboardroute)
app.use("/report",ReportRoute)




app.use("/userManagement",UserDetailsRoute)


app.use("/AdminAuth",AdminAuthRoutes);
app.use("/style",StyleRoute)



app.get("/", (req, res) => {
  res.send("Hello from backend!");
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from "express";
import {
  createAffiliateData,
  getAllAffiliateData,
  editAffiliateData,
  deleteAffiliateData,
  getAffiliatedDataById
} from "../controllers/AffiliateData.controller.js";
import { uploadMiddleware } from "../middlewares/awsUpload.middleware.js";

const AffiliateDataRoute = express.Router();

// Admin notification management
AffiliateDataRoute.post("/notifications",uploadMiddleware.array("images", 10), createAffiliateData);     // Create
AffiliateDataRoute.get("/getnotifications", getAllAffiliateData);     // View all
AffiliateDataRoute.get("/notificationsById/:id", getAffiliatedDataById);     // View all
AffiliateDataRoute.put("/notifications/:id",uploadMiddleware.array("images", 10), editAffiliateData);    // Edit
AffiliateDataRoute.delete("/notifications/:id", deleteAffiliateData); // Delete

export default AffiliateDataRoute;

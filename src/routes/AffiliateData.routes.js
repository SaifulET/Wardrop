import express from "express";
import {
  createAffiliateData,
  getAllAffiliateData,
  editAffiliateData,
  deleteAffiliateData,
  getAffiliatedDataById
} from "../controllers/AffiliateData.controller.js";

const AffiliateDataRoute = express.Router();

// Admin notification management
AffiliateDataRoute.post("/notifications", createAffiliateData);     // Create
AffiliateDataRoute.get("/notifications", getAllAffiliateData);     // View all
AffiliateDataRoute.get("/notificationsById/:id", getAffiliatedDataById);     // View all
AffiliateDataRoute.put("/notifications/:id", editAffiliateData);    // Edit
AffiliateDataRoute.delete("/notifications/:id", deleteAffiliateData); // Delete

export default AffiliateDataRoute;

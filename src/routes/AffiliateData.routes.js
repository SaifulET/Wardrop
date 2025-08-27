import express from "express";
import {
  createAffiliateData,
  getAllAffiliateData,
  editAffiliateData,
  deleteAffiliateData,
  getAffiliatedDataById
} from "../controllers/AffiliateData.controller.js";
import  { conditionalUpload } from "../middlewares/multer.middleware.js"

const AffiliateDataRoute = express.Router();

// Admin notification management
AffiliateDataRoute.post("/notifications",conditionalUpload, createAffiliateData);     // Create
AffiliateDataRoute.get("/getnotifications", getAllAffiliateData);     // View all
AffiliateDataRoute.get("/notificationsById/:id", getAffiliatedDataById);     // View all
AffiliateDataRoute.put("/notifications/:id",conditionalUpload, editAffiliateData);    // Edit
AffiliateDataRoute.delete("/notifications/:id", deleteAffiliateData); // Delete

export default AffiliateDataRoute;

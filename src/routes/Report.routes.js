import express from "express";
import { createReportController,deleteReportByIdController,getAllReportsController, searchReportsController, toggleReportStatusController } from "../controllers/Report.controller.js";
import { authCheck } from "../middlewares/auth.middleware.js"; // your JWT auth middleware

const  ReportRoute= express.Router();

// Create a new report (user or community post)
ReportRoute.post("/ReportCreate", authCheck, createReportController);
ReportRoute.get("/ReportRead", authCheck, getAllReportsController);
ReportRoute.post("/Reportdelete", authCheck, deleteReportByIdController);
ReportRoute.post("/ReportStatusToggle", authCheck, toggleReportStatusController);
ReportRoute.post("/ReportFilter", authCheck,searchReportsController);




export default ReportRoute;

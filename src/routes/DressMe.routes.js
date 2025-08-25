import express from "express";
import * as DressMeController from "../controllers/DressMe.controller.js";
import { authCheck } from "../middlewares/auth.middleware.js"
import { conditionalUpload } from "../middlewares/multer.middleware.js";
const DressMeRoutes = express.Router();





DressMeRoutes.post("/createDressMe",authCheck,conditionalUpload, DressMeController.createDressMe);
DressMeRoutes.put("/updateDressMe:id",authCheck,conditionalUpload, DressMeController.editDressMe);
DressMeRoutes.delete("/deleteDressMe/:id",authCheck, DressMeController.deleteDressMe);
DressMeRoutes.get("/showDressMe",authCheck, DressMeController.getAllDressMe);
DressMeRoutes.get("/DetailsDressMe/:id",authCheck, DressMeController.getDressMeDetailsController);




export default DressMeRoutes;
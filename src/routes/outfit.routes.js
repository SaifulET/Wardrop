import express from "express";
import * as outfitController from "../controllers/Outfit.controller.js";
import { authCheck } from "../middlewares/auth.middleware.js";
import { conditionalUpload } from "../middlewares/multer.middleware.js";

const OutfitRoutes = express.Router();

OutfitRoutes.post(
  "/createOutfit",
  authCheck,conditionalUpload,
  outfitController.createOutfitController
);
OutfitRoutes.put(
  "/updateOutfit/:id",
  authCheck,
  conditionalUpload,
  outfitController.updateOutfitController
);
OutfitRoutes.delete(
  "/deleteOutfit/:id",
  authCheck,
  outfitController.deleteOutfitController
);
OutfitRoutes.get(
  "/showOutfits",
  authCheck,
  outfitController.getUserOutfitsController
);
OutfitRoutes.get(
  "/DetailsOutfit/:id",
  authCheck,
  outfitController.getOutfitByIdController
);

export default OutfitRoutes;

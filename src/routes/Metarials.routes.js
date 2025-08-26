import express from "express";

import { authCheck } from "../middlewares/auth.middleware.js";
import { creatMetarialsController, deletMetarialsController, getAllMetarialController, updateMetarialsController } from "../controllers/Metarial.controller.js";

const MetarialRoute = express.Router();

// Public: Get styles
MetarialRoute.get("/getAllMetarial",authCheck, getAllMetarialController);

// Admin only: Manage styles
MetarialRoute.post("/createMetarial", authCheck, creatMetarialsController);
MetarialRoute.put("/UpdateMetarial/:id", authCheck, updateMetarialsController);
MetarialRoute.delete("/DeleteMetarial/:id",authCheck, deletMetarialsController);

export default MetarialRoute;

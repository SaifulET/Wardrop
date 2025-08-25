import express from "express";
import {
  createStyleController,
  updateStyleController,
  deleteStyleController,
  getAllStylesController,
  countStyleUsageController
} from "../controllers/style.controller.js";
import { authCheck } from "../middlewares/auth.middleware.js";

const StyleRoute = express.Router();

// Public: Get styles
StyleRoute.get("/getAllStyle",authCheck, getAllStylesController);

// Admin only: Manage styles
StyleRoute.post("/createStyle", authCheck, createStyleController);
StyleRoute.put("/UpdateStyle/:id", authCheck, updateStyleController);
StyleRoute.delete("/DeleteStyle/:id",authCheck, deleteStyleController);
StyleRoute.get("/CountEachStyle",authCheck, countStyleUsageController);

export default StyleRoute;

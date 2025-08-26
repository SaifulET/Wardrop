import express from "express";
import {

  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
  getAllCategoryController
} from "../controllers/category.controller.js";
import { authCheck } from "../middlewares/auth.middleware.js";

const CategoryRoute = express.Router();

// Public: Get styles
CategoryRoute.get("/getAllCategory",authCheck, getAllCategoryController);

// Admin only: Manage styles
CategoryRoute.post("/createCategory", authCheck, createCategoryController);
CategoryRoute.put("/UpdateCategory/:id", authCheck, updateCategoryController);
CategoryRoute.delete("/DeleteCategory/:id",authCheck, deleteCategoryController);

export default CategoryRoute;

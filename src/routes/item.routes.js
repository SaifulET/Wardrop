import express from "express";
import * as itemController from "../controllers/item.controller.js";
import { authCheck } from "../middlewares/auth.middleware.js";
import {  uploadMiddleware } from "../middlewares/awsUpload.middleware.js";
const ItemsRoutes = express.Router();


ItemsRoutes.post("/CreateItem",authCheck,uploadMiddleware.array("images", 10), itemController.createItem);
ItemsRoutes.get("/getItems",authCheck, itemController.getItems);
ItemsRoutes.get("/getItem/:id",authCheck, itemController.getItem);
ItemsRoutes.put("/updateItem/:id",authCheck,uploadMiddleware.array("images", 10), itemController.updateItem);
ItemsRoutes.delete("/deleteItem/:id",authCheck, itemController.deleteItem);
ItemsRoutes.get("/getAllBrands",authCheck, itemController.getBrandsByUserController);
export default ItemsRoutes; 
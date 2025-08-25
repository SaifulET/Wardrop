import express from "express";
import * as itemController from "../controllers/item.controller.js";
import { authCheck } from "../middlewares/auth.middleware.js";
import { conditionalUpload } from "../middlewares/multer.middleware.js";
const ItemsRoutes = express.Router();


ItemsRoutes.post("/CreateItem",authCheck,conditionalUpload, itemController.createItem);
ItemsRoutes.get("/getItems",authCheck, itemController.getItems);
ItemsRoutes.get("/getItem/:id",authCheck, itemController.getItem);
ItemsRoutes.put("/updateItem/:id",authCheck,conditionalUpload, itemController.updateItem);
ItemsRoutes.delete("/deleteItem/:id",authCheck, itemController.deleteItem);
export default ItemsRoutes;
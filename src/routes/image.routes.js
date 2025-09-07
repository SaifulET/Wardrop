import express from "express";
import { conditionalUploads } from "../middlewares/awsUpload.middleware.js";
import { uploadImages, getImage } from "../controllers/image.controller.js";

const imageRoute = express.Router();

// Upload endpoint
imageRoute.post("/upload", conditionalUploads, uploadImages);

// Get presigned URL for a specific image
imageRoute.get("/:key", getImage);

export default imageRoute;

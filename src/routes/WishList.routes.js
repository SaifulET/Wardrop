import express from "express";
import { createWishlist, getWishlists, deleteWishlist, addImagesToWishlist } from "../controllers/WishList.controller.js";
import { authCheck } from "../middlewares/auth.middleware.js";
import { conditionalMultipleUpload } from "../middlewares/multerForMultipleImage.middleware.js";

const WishListRoutes = express.Router();



WishListRoutes.post("/CreateWishList", authCheck, conditionalMultipleUpload, createWishlist);


WishListRoutes.get("/GetAllWishList", authCheck, getWishlists);

WishListRoutes.get("/GetWishListById/:id", authCheck, getWishlists);

WishListRoutes.post("/AddImagesToWishlist/:id", authCheck,conditionalMultipleUpload,addImagesToWishlist);


WishListRoutes.delete("/DeleteWishList/:id", authCheck, deleteWishlist);

export default WishListRoutes;

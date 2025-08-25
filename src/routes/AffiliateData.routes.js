import express from "express";
import { authCheck } from "../middlewares/auth.middleware.js";

const PrivacyRoute = express.Router();

PrivacyRoute.get("/CheckPrivacy", authCheck, getPrivacyController);
PrivacyRoute.patch("/changePrivacy", authCheck, updatePrivacyController);

export default PrivacyRoute;

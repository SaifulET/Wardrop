import express from "express";
import { AllDeleteAccountListController, deleteAccountController, requestForAccountDelete } from "../controllers/DeleteAccount.controller.js";
import { authCheck} from "../middlewares/auth.middleware.js";

const DeleteAccount = express.Router();

DeleteAccount.delete("/delete", authCheck, deleteAccountController);
DeleteAccount.get("/deleteRequest", authCheck, requestForAccountDelete);
DeleteAccount.get("/AllAccount", authCheck, AllDeleteAccountListController);


export default DeleteAccount;

import express from "express";
import { deleteAccountController, requestForAccountDelete } from "../controllers/DeleteAccount.controller.js";
import { authCheck} from "../middlewares/auth.middleware.js";

const DeleteAccount = express.Router();

DeleteAccount.delete("/delete", authCheck, deleteAccountController);
DeleteAccount.get("/deleteRequest", authCheck, requestForAccountDelete);


export default DeleteAccount;

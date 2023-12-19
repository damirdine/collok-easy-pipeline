import express from "express";
import userController from "../controllers/usersController.js";

const userRouter = express.Router();

// Route pour récupérer tous les utilisateurs

userRouter.get("/", userController.me);

userRouter.put("/", userController.editProfile);

userRouter.delete("/", userController.deleteProfile);

export default userRouter;

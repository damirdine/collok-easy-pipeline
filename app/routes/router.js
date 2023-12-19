import express from "express";
import authRouter from "./auth.js";
import authController from "../controllers/authController.js";
import authMiddleware from "../middleware/auth.js";

const apiV1Router = express.Router();

// Authentication and User management
apiV1Router.use("/auth", authRouter);
apiV1Router.get("/me", authMiddleware, authController.me);

export default apiV1Router;

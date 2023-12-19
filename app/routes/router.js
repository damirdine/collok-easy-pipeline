import express from "express";
import authController from "../controllers/authController.js";
import authMiddleware from "../middleware/auth.js";
import authRouter from "./auth.js";
import outgoingRouter from "./outgoing.js";
import taskRouter from "./task.js";
import colocationRouter from "./colocation.js";

const apiV1Router = express.Router();

// Authentication and User management
apiV1Router.use("/auth", authRouter);
apiV1Router.get("/me", authController.me);

//Colocation routes
apiV1Router.use("/colocation", outgoingRouter);
apiV1Router.use("/colocation", taskRouter);
apiV1Router.use("/colocation", colocationRouter);

export default apiV1Router;

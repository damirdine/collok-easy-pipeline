import express from "express";
import getTasksByColocation from "../controllers/tasksController.js";

const router = express.Router();

router.get("/:colocationId/tasks", getTasksByColocation);

export default router;

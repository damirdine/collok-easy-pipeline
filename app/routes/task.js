import express from "express";
import tasksController from "../controllers/tasksController.js";

const taskRouter = express.Router();

taskRouter.get("/:colocationId/tasks", tasksController.getTasksByColocation);
taskRouter.get("/:colocationId/tasks/:taskId", tasksController.getTask);
taskRouter.put("/:colocationId/tasks/:taskId", tasksController.updateTask);
export default taskRouter;

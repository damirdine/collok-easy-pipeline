import express from "express";
import tasksController from "../controllers/tasksController.js";

const taskRouter = express.Router();

taskRouter.get("/:colocationId/tasks", tasksController.getTasksByColocation);
taskRouter.get("/:colocationId/tasks/:taskId", tasksController.getTask);
taskRouter.put("/:colocationId/tasks/:taskId", tasksController.updateTask);
taskRouter.post(
  "/:colocationId/tasks/:taskId/assign-user",
  tasksController.assignUserToTask
);
taskRouter.delete(
  "/:colocationId/tasks/:taskId/assign-user",
  tasksController.removeUserFromTask
);

export default taskRouter;

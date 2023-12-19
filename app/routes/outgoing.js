import express from "express";
import outgoingController from "../controllers/outgoingsController.js";

const outgoingRouter = express.Router();

outgoingRouter.get(
  "/:colocationId/outgoings",
  outgoingController.getOutgoingsByColocation
);

export default outgoingRouter;

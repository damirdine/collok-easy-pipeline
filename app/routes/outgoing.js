import express from "express";
import getOutgoingsByColocation from "../controllers/outgoingsController.js";

const router = express.Router();

router.get("/:colocationId/outgoings", getOutgoingsByColocation);

export default router;

// routes/colocationRouter.js
import express from "express";
import * as colocationController from "../controllers/colocationController.js";

const colocationRouter = express.Router();

// get All
colocationRouter.get("/", colocationController.getColocations);
//get One
colocationRouter.get("/:id", colocationController.getColocationById);
// create one
colocationRouter.post("/", colocationController.createColocation);
// get coloc by admin
colocationRouter.get(
  "/admin/:adminUserId",
  colocationController.getColocationByAdmin
);
// update coloc admin
colocationRouter.put(
  "/:colocationId/admin",
  colocationController.updateColocationAdmin
);
// add coloc member
colocationRouter.put(
  "/:colocationId/members",
  colocationController.addColocationMember
);

export default colocationRouter;

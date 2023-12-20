// routes/colocationRouter.js
import express from "express";
import * as colocationController from "../controllers/colocationController.js";

const colocationRouter = express.Router();

// get All -- App V2 ( liste des colocations a parcourir et '' postuler '')
colocationRouter.get(
  "/", 
  colocationController.getColocations);
//get One coloc + users + objectives + admin user ADMIN USER UTILE POUR LE FRONT ? 
colocationRouter.get(
  "/:colocationId",
  colocationController.getColocationById);
// create one
colocationRouter.post(
  "/",
   colocationController.createColocation);
// Faire une update one pour changer les infos ?

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
// delete coloc
colocationRouter.delete(
  "/:colocationId/members",
  colocationController.deleteColocationMember
);
export default colocationRouter;

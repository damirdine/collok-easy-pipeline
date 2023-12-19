// routes/colocationRouter.js
import express from 'express';
import * as colocationController from '../controllers/colocationController.js';

const router = express.Router();

// get All
router.get('/', colocationController.getColocations);
//get One
router.get('/:id', colocationController.getColocationById);
// create one
router.post('/', colocationController.createColocation);
// get coloc by admin
router.get('/admin/:adminUserId', colocationController.getColocationByAdmin);
// update coloc admin
router.put('/:colocationId/admin', colocationController.updateColocationAdmin);
// add coloc member
router.put('/:colocationId/members', colocationController.addColocationMember);

export default router;

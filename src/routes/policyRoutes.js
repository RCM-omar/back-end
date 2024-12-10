import express from 'express';
import * as policyControllers from '../controllers/policyController.js';
import validate from '../middlewares/validate.js';

const router = express.Router();

router.get('/', policyControllers.getPolicies); 
router.get('/:id', policyControllers.getPolicy); 
/*
router.delete('/:id', policyControllers.deletePolicy); 
router.post('/', validate(policySchema)  , policyControllers.addPolicy); 
router.put('/:id' , policyControllers.updatePolicy); 
*/

export default router;

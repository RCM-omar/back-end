import express from 'express';
import * as payerControllers from '../controllers/payerController.js';
import { payerSchema } from '../validators/payerValidator.js';
import validate from '../middlewares/validate.js';

const router = express.Router();

router.get('/', payerControllers.getPayers); 
router.get('/:id', payerControllers.getPayers ); 
/*
router.delete('/:id', payerControllers.deletePayer); 
router.post('/', validate(payerSchema)  , payerControllers.addPayer); 
router.put('/:id' , payerControllers.updatePayer); 
*/

export default router;

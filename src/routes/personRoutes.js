import express from 'express';
import * as personControllers from '../controllers/personController.js';
import { personSchema } from '../validators/personValidator.js';
import validate from '../middlewares/validate.js';

const router = express.Router();


router.get('/', personControllers.getPersons); 
router.get('/:id', personControllers.getPerson); 
router.delete('/:id', personControllers.deletePerson); 
router.post('/', validate(personSchema)  , personControllers.addPerson); 
// router.put('/', validate(personSchema)  , personControllers.updatePerson); 
router.put('/:id' , personControllers.updatePerson); 


export default router;

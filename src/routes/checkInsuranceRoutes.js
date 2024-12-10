import express from "express";
import { checkinsurance } from "../controllers/checkInsurance.js";

const router = express.Router();

router.get("", checkinsurance);
router.get('/:patientId', checkinsurance); 

export default router;

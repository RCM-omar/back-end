import personRoutes from "./personRoutes.js";
import payerRoutes from "./payerRoutes.js";
import policyRoutes from "./policyRoutes.js";
import checkinsuranceRoutes from './checkInsuranceRoutes.js'
import express from "express";

const router = express.Router();


router.use("/api/persons", personRoutes);
router.use("/api/payers", payerRoutes);
router.use("/api/policies", policyRoutes);

//router.use('/api/coverage',coverageRoutes );

router.use('/api/checkinsurance',checkinsuranceRoutes );

export default router;






/*
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
*/
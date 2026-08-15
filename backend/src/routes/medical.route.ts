import express from 'express';
import { createMedicalRecordController, deleteMedicalRecordController, getMedicalRecordController, getMedicalRecordsController, updateMedicalRecordController } from '../controllers/medical.controller.js';
import { authorize, protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/patient/:id', protect, authorize("ADMIN", "DOCTOR"), getMedicalRecordsController);
router.get('/record/:id', protect, authorize("ADMIN", "DOCTOR"), getMedicalRecordController);
router.post('/record', protect, authorize("DOCTOR"), createMedicalRecordController);
router.patch('/record/:id', protect, authorize("ADMIN", "DOCTOR"), updateMedicalRecordController);
router.delete('/record/:id', protect, authorize("ADMIN", "DOCTOR"), deleteMedicalRecordController);

export default router;
import express from 'express';
import { createMedicalRecordController, deleteMedicalRecordController, getMedicalRecordController, getMedicalRecordsController, updateMedicalRecordController } from '../controllers/medical.controller.js';

const router = express.Router();

router.get('/patient/:id', getMedicalRecordsController);
router.get('/record/:id', getMedicalRecordController);
router.post('/record', createMedicalRecordController);
router.patch('/record/:id', updateMedicalRecordController);
router.delete('/record/:id', deleteMedicalRecordController);

export default router;
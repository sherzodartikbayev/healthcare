import express from 'express';
import { createPatientController, deletePatientController, getPatientController, getPatientsController, updatePatientController } from '../controllers/patient.controller.js';
import { authorize, protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', protect, authorize("ADMIN", "DOCTOR"), getPatientsController);
router.get('/:id', protect, authorize("ADMIN", "DOCTOR"), getPatientController);

router.post('/', protect, authorize("ADMIN"), createPatientController);
router.patch('/:id', protect, authorize("ADMIN"), updatePatientController);
router.delete('/:id', protect, authorize("ADMIN"), deletePatientController);

export default router;
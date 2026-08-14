import express from 'express';
import { createPatientController, deletePatientController, getPatientController, getPatientsController, updatePatientController } from '../controllers/patient.controller.js';

const router = express.Router();

router.get('/', getPatientsController);
router.get('/:id', getPatientController);
router.post('/', createPatientController);
router.patch('/:id', updatePatientController);
router.delete('/:id', deletePatientController);

export default router;
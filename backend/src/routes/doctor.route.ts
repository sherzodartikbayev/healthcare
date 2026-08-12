import express from 'express';
import {
    createDoctorController,
    deleteDoctorController,
    getDoctorController,
    getDoctorsController,
    updateDoctorController
} from '../controllers/doctor.controller.js';

const router = express.Router();

router.get('/', getDoctorsController);
router.get('/:id', getDoctorController);
router.post('/', createDoctorController);
router.patch('/:id', updateDoctorController);
router.delete('/:id', deleteDoctorController);

export default router;
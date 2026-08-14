import express from 'express';
import {
    createDoctorController,
    deleteDoctorController,
    getDoctorController,
    getDoctorsController,
    updateDoctorController
} from '../controllers/doctor.controller.js';
import { authorize, protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', protect, getDoctorsController);
router.get('/:id', protect, getDoctorController);

router.post('/', protect, authorize("ADMIN"), createDoctorController);
router.patch('/:id', protect, authorize("ADMIN"), updateDoctorController);
router.delete('/:id', protect, authorize("ADMIN"), deleteDoctorController);

export default router;
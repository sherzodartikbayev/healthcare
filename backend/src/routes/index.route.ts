import express from 'express';
import authRoute from './auth.route.js';
import doctorRoute from './doctor.route.js';
import adminRoute from './admin.route.js';
import patientRoute from './patient.route.js';
import medicalRoute from './medical.route.js';
import departmentRoute from './department.route.js';
import roomRoute from './room.route.js';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/admin', adminRoute);
router.use('/doctor', doctorRoute);
router.use('/patient', patientRoute);
router.use('/medical', medicalRoute);
router.use('/department', departmentRoute);
router.use('/room', roomRoute);

export default router;

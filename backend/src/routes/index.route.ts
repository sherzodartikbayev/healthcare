import express from 'express';
import authRoute from './auth.route.js';
import doctorRoute from './doctor.route.js';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/doctor', doctorRoute);

export default router;

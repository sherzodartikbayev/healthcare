import express from 'express';
import { getDashboardController } from '../controllers/admin.controller.js';
import { authorize, protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/dashboard', protect, authorize("ADMIN"), getDashboardController);

export default router;

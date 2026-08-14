import express from 'express';
import { getDashboardController } from '../controllers/admin.controller.js';

const router = express.Router();

router.get('/dashboard', getDashboardController);

export default router;

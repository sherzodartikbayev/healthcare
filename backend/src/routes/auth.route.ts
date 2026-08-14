import express from 'express';
import { login, logout, register } from '../controllers/auth.controller.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 50,
    standardHeaders: "draft-7",
    legacyHeaders: false,
});

router.post('/login', loginLimiter, login);
router.post('/register', register);
router.post('/logout', logout);

export default router;


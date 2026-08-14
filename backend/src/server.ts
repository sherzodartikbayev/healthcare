import 'dotenv/config';

import express from 'express';
import { db } from './config/db.js';
import mainRoute from './routes/index.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import errorMiddleware from './middlewares/error.middleware.js';
import helmet from 'helmet';
import rateLimit from "express-rate-limit";
import hpp from 'hpp';

const app = express();

app.disable("x-powered-by");

// Middlewares
app.use(helmet());
app.use(rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 500,
  standardHeaders: 'draft-7',
  legacyHeaders: false
}));
app.use(hpp());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use('/api', mainRoute);

// Error handling
app.use(errorMiddleware);

const PORT = process.env.PORT || 8080;

const server = async () => {
  try {
    await db.execute('SELECT 1');
    console.log('Connected to DB!');
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

server();

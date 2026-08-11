import 'dotenv/config';

import express from 'express';
import { db } from './config/db.js';
import mainRoute from './routes/index.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

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

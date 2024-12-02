import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { errorHandler } from './middleware/errorHandler.js';
import './config/db.js';

import authRoutes from './routes/authRoutes.js';
//import battleRoutes from './routes/battleRoutes.js';
import leaderboardRoutes from './routes/leaderboardRoutes.js';
//import pokemonRoutes from './routes/pokemonRoutes.js';
import rosterRoutes from './routes/rosterRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// API routes
//app.use('/api/auth', authRoutes);
//app.use('/api/battle', battleRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
//app.use('/api/pokemon', pokemonRoutes);
app.use('/api/roster', rosterRoutes);

// Error handler
app.use(errorHandler);

export default app;

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import CORS middleware
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import rosterRoutes from './routes/rosterRoutes.js';
import leaderboardRoutes from './routes/leaderboardRoutes.js';
import battleRoutes from './routes/battleRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Enable CORS for frontend requests
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from your frontend
    credentials: true, // Allow sending cookies if needed
  })
);

// Middleware to parse JSON requests
app.use(express.json());

// Authentication routes
app.use('/api/auth', authRoutes);
app.use('/api/rosters', rosterRoutes);
app.use('/api/battles', battleRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

// Default route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Custom error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

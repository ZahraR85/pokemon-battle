import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; // Assume you have a database configuration file
import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Authentication routes
app.use('/api/auth', authRoutes);

// Default route for testing
app.get('/', (req, res) => {
res.send('API is running...');
});

// Custom error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

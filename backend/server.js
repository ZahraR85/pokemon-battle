import dotenv from 'dotenv';
import connectDB from './config/db.js';
import app from './app.js'; // Import the app instance from app.js

dotenv.config();
connectDB(); // Call the function to connect to MongoDB

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

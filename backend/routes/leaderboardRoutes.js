import express from 'express';
import {
    getLeaderboard,
    addLeaderboardEntry,
    updateLeaderboardEntry,
    deleteLeaderboardEntry,
} from '../controllers/leaderboardController.js';

const router = express.Router();

router.get('/', getLeaderboard); // Get all entries
router.post('/', addLeaderboardEntry); // Add a new entry
router.put('/:id', updateLeaderboardEntry); // Update an entry
router.delete('/:id', deleteLeaderboardEntry); // Delete an entry

export default router;

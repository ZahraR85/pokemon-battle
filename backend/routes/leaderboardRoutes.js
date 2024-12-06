import express from 'express';
import {
  addOrUpdateLeaderboardEntry,
  getLeaderboard,
  deleteLeaderboardEntry,
  saveBattleResult,
} from '../controllers/leaderboardController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/addOrUpdate', protect, addOrUpdateLeaderboardEntry); // Add or update leaderboard entry
router.get('/', protect, getLeaderboard); // Get leaderboard
router.post('/battle', protect, saveBattleResult); // Save a battle result
router.delete('/:id', protect, deleteLeaderboardEntry); // Delete a user's leaderboard entry

export default router;

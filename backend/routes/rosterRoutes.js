import express from 'express';
import { addToRoster, getRoster, removeFromRoster } from '../controllers/rosterController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getRoster); // Get user's roster
router.post('/', protect, addToRoster); // Add Pokémon to the roster
router.delete('/:id', protect, removeFromRoster); // Remove Pokémon from the roster

export default router;

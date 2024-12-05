import express from 'express';
import { addToRoster, getRoster, removeFromRoster, getPokemonById } from '../controllers/rosterController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get the roster (Pokémon ids) of a user
router.get('/', protect, getRoster);

// Get a specific Pokémon by id
router.get('/:id', protect, getPokemonById);

// Add Pokémon to the roster
router.post('/', protect, addToRoster);

// Remove Pokémon from the roster
router.delete('/:id', protect, removeFromRoster); // Remove Pokémon by name, type, and level in body

export default router;

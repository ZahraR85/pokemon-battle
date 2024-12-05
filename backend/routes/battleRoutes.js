import express from 'express';
import { saveBattle} from '../controllers/battleController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, saveBattle); // Save a new battle
//router.get('/', protect, getBattles); // Get battles for a user
//router.get('/:id', protect, getBattleById); // Get a specific battle by ID

export default router;

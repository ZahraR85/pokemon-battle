import express from 'express';
import { startBattle, getBattleDetails } from '../controllers/battleController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, startBattle); // Start a new battle
router.get('/:battleId', protect, getBattleDetails); // Get details of a specific battle

export default router;

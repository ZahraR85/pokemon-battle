import express from "express";
import { saveBattle, getBattles, getBattleById } from "../controllers/battleController.js";
import { protect } from "../middleware/authMiddleware.js"; // Protect routes for logged-in users

const router = express.Router();

// POST: Save a battle result
router.post("/", protect, saveBattle);

// GET: Get all battles
router.get("/", protect, getBattles);

// GET: Get a specific battle by ID
router.get("/:id", protect, getBattleById);

export default router;

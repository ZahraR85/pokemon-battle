import Battle from '../models/Battle.js';
import { addOrUpdateLeaderboardEntry } from './leaderboardController.js';

// Save a battle result
export const saveBattle = async (req, res) => {
  const { userId, userPokemon, opponentPokemon, winner } = req.body;
  if (!userId || !userPokemon || !opponentPokemon || !winner) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Save the battle
    const battle = new Battle({
      userId,
      userPokemon,
      opponentPokemon,
      winner,
    });
    await battle.save();

    // Update leaderboard for the winner
    await addOrUpdateLeaderboardEntry({
      body: { userId: winnerId, score: 10 },
    });

    res.status(201).json({ message: 'Battle saved successfully.', battle });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save battle.', error });
  }
};

// Get all battles for a user
export const getBattles = async (req, res) => {
  const userId = req.user.id;

  try {

    const battles = await Battle.find()
      .populate("userId", "name email") // Populate user details

    res.status(200).json(battles);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve battles.', error });
  }
};

// Get a specific battle by ID
export const getBattleById = async (req, res) => {
  try {
    const battle = await Battle.findById(req.params.id)
      .populate("userId", "name email")

    if (!battle) {
      return res.status(404).json({ message: 'Battle not found.' });
    }

    res.status(200).json(battle);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve battle.', error });
  }
};

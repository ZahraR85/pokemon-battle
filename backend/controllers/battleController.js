import Battle from "../models/Battle.js";

// Save a battle result
export const saveBattle = async (req, res) => {
  const { userId, userPokemon, opponentPokemon, winner } = req.body;

  if (!userId || !userPokemon || !opponentPokemon || !winner) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const battle = new Battle({
      userId,
      userPokemon,
      opponentPokemon,
      winner,
    });

    const savedBattle = await battle.save();
    res.status(201).json({
      message: "Battle saved successfully",
      battle: savedBattle,
    });

    // TODO: update leaderboard
  } catch (error) {
    console.error("Error saving battle:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all battles
export const getBattles = async (req, res) => {
  try {
    const battles = await Battle.find()
      .populate("userId", "name email") // Populate user details

    res.status(200).json(battles);
  } catch (error) {
    console.error("Error fetching battles:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get a battle by ID
export const getBattleById = async (req, res) => {
  try {
    const battle = await Battle.findById(req.params.id)
      .populate("userId", "name email")

    if (!battle) {
      return res.status(404).json({ message: "Battle not found" });
    }

    res.status(200).json(battle);
  } catch (error) {
    console.error("Error fetching battle by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
/*import asyncHandler from 'express-async-handler';
import { getRandomPokemon } from '../utils/pokemonHelper.js'; // A helper function for fetching random Pokémon
import Roster from '../models/Roster.js';

// Battle Pokémon using stats
export const battle = asyncHandler(async (req, res) => {
  const { pokemonId } = req.body; // ID of the Pokémon the user selects for battle
  const playerPokemon = await Roster.findOne({ userId: req.user.id, "pokemon._id": pokemonId });

  if (!playerPokemon) {
    res.status(404);
    throw new Error('Selected Pokémon not found in your roster.');
  }

  const randomPokemon = await getRandomPokemon(); // Fetch a random Pokémon from PokeAPI

  const playerStats = playerPokemon.pokemon.stats.attack; // Use attack as a simple example
  const randomStats = randomPokemon.stats.attack;

  let result;
  if (playerStats > randomStats) {
    result = 'win';
    req.user.score += 10; // Increment user score for a win
    await req.user.save();
  } else {
    result = 'lose';
  }

  res.json({
    result,
    playerPokemon: playerPokemon.pokemon,
    opponentPokemon: randomPokemon,
  });
});
*/

import asyncHandler from 'express-async-handler';
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

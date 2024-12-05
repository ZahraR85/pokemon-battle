import Roster from '../models/Roster.js';
import User from '../models/User.js';
/**
 * Get the user's roster.
 */
export const getRoster = async (req, res) => {
  const userId = req.user.id; // Authenticated user's ID from the `protect` middleware

  try {
    const roster = await Roster.findOne({ userId });

    if (!roster) {
      return res.status(404).json({ error: "Roster not found." });
    }

    res.status(200).json({ roster });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get a specific Pokémon by ID.
 */
export const getPokemonById = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const roster = await Roster.findOne({ userId });

    if (!roster) {
      return res.status(404).json({ error: "Roster not found." });
    }

    const pokemon = roster.pokemon.find((p) => p._id.toString() === id);

    if (!pokemon) {
      return res.status(404).json({ error: "Pokémon not found in roster." });
    }

    res.status(200).json({ pokemon });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a Pokémon to the user's roster
export const addToRoster = async (req, res) => {
  const { pokemon } = req.body; // Pokemon data sent in the request body
  const userId = req.user.id; // Get the user ID from the authenticated request

  if (!pokemon || !pokemon.name || !pokemon.type || !pokemon.level) {
    return res.status(400).json({ error: "Complete Pokémon data is required." });
  }

  try {
    // Find the roster for the user
    let roster = await Roster.findOne({ userId });

    if (!roster) {
      // If no roster exists for the user, create a new one with the first Pokémon
      roster = new Roster({ userId, pokemon: [pokemon] });
    } else {
      // Check if the Pokémon already exists in the roster
      const exists = roster.pokemon.some(
        (p) => p.name === pokemon.name && p.type === pokemon.type && p.level === pokemon.level
      );

      if (exists) {
        return res.status(409).json({ error: "Pokémon already in roster." });
      }

      // Add the new Pokémon to the roster
      roster.pokemon.push(pokemon);
    }

    // Save the updated roster
    await roster.save();
    res.status(201).json({ message: "Pokémon added to roster.", roster });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove a Pokémon from the user's roster
export const removeFromRoster = async (req, res) => {
  const { name } = req.body; // Name of the Pokémon to remove
  const userId = req.user.id; // Get the user ID from the authenticated request

  if (!name) {
    return res.status(400).json({ error: "Pokémon name is required to remove." });
  }

  try {
    // Find the roster for the user
    const roster = await Roster.findOne({ userId });

    if (!roster) {
      return res.status(404).json({ error: "Roster not found." });
    }

    // Find the index of the Pokémon in the roster
    const pokemonIndex = roster.pokemon.findIndex((p) => p.name === name);

    if (pokemonIndex === -1) {
      return res.status(404).json({ error: "Pokémon not found in your roster." });
    }

    // Remove the Pokémon from the roster
    roster.pokemon.splice(pokemonIndex, 1);

    // Save the updated roster
    await roster.save();
    res.status(200).json({ message: `${name} removed from your roster!`, roster });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


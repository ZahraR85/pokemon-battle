import Roster from '../models/Roster.js';

export const getRoster = async (req, res) => {
    try {
        const roster = await Roster.find({ userId: req.user.id });
        res.json(roster);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addToRoster = async (req, res) => {
    const { pokemon } = req.body;

    if (!pokemon || !pokemon.name || !pokemon.type || !pokemon.level) {
        return res.status(400).json({ message: "Invalid Pokémon data" });
    }

    try {
        let roster = await Roster.findOne({ userId: req.user.id });
        if (!roster) {
            roster = new Roster({ userId: req.user.id, pokemon: [pokemon] });
        } else {
            roster.pokemon.push(pokemon);
        }
        const updatedRoster = await roster.save();
        res.status(201).json(updatedRoster);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: error.message });
    }
};

export const removeFromRoster = async (req, res) => {
  const { pokemonId } = req.params;  // Assuming you pass the Pokemon ID to be removed in the URL

try {
// Find the roster for the user
const roster = await Roster.findOne({ userId: req.user.id });

if (!roster) {
    return res.status(404).json({ message: "Roster not found" });
    }

    // Remove the Pokémon from the roster
    roster.pokemon = roster.pokemon.filter(pokemon => pokemon.id !== pokemonId);

    // Save the updated roster
    const updatedRoster = await roster.save();
    res.status(200).json(updatedRoster);
} catch (error) {
    res.status(500).json({ message: error.message });
}
};


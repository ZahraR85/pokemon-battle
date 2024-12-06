import Roster from "../models/Roster.js";

export const getRoster = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const roster = await Roster.findOne({ userId: id });
    res.json(roster);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addToRoster = async (req, res) => {
  try {
    let { pokemon } = req.body;

    // Ensure pokemon is always an array
    if (!Array.isArray(pokemon)) {
      pokemon = [pokemon];
    }

    // find existing roster for this user
    const roster = await Roster.findOne({ userId: req.user.id });
    if (roster) {
      // update the roster
      roster.pokemon = pokemon;
      await roster.save();
    } else {
      // create new roster
      const newRoster = new Roster({
        userId: req.user._id,
        pokemon,
      });
      await newRoster.save();
    }

    res.status(201).json(roster);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

export const removeFromRoster = async (req, res) => {
  const { pokemonId } = req.params; // Assuming you pass the Pokemon ID to be removed in the URL

  try {
    // Find the roster for the user
    const roster = await Roster.findOne({ userId: req.user.id });

    if (!roster) {
      return res.status(404).json({ message: "Roster not found" });
    }

    // Remove the Pokémon from the roster
    roster.pokemon = roster.pokemon.filter(
      (pokemon) => pokemon.id !== pokemonId
    );

    // Save the updated roster
    const updatedRoster = await roster.save();
    res.status(200).json(updatedRoster);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

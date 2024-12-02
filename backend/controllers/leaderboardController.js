import Leaderboard from '../models/Leaderboard.js';

export const addLeaderboardEntry = async (req, res) => {
    const { username, score } = req.body;

    if (!username || score === undefined) {
        return res.status(400).json({ message: 'Username and score are required.' });
    }

    try {
        const newEntry = new Leaderboard({ username, score });
        await newEntry.save();
        res.status(201).json(newEntry);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create leaderboard entry.', error });
    }
};
export const getLeaderboard = async (req, res) => {
  try {
      const leaderboard = await Leaderboard.find().sort({ score: -1 }); // Sort by score descending
      res.status(200).json(leaderboard);
  } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve leaderboard.', error });
  }
};
export const updateLeaderboardEntry = async (req, res) => {
  const { id } = req.params;
  const { score } = req.body;

  try {
      const updatedEntry = await Leaderboard.findByIdAndUpdate(
          id,
          { score },
          { new: true } // Return the updated document
      );

      if (!updatedEntry) {
          return res.status(404).json({ message: 'Entry not found.' });
      }

      res.status(200).json(updatedEntry);
  } catch (error) {
      res.status(500).json({ message: 'Failed to update leaderboard entry.', error });
  }
};
export const deleteLeaderboardEntry = async (req, res) => {
  const { id } = req.params;

  try {
      const deletedEntry = await Leaderboard.findByIdAndDelete(id);

      if (!deletedEntry) {
          return res.status(404).json({ message: 'Entry not found.' });
      }

      res.status(200).json({ message: 'Entry deleted successfully.' });
  } catch (error) {
      res.status(500).json({ message: 'Failed to delete leaderboard entry.', error });
  }
};

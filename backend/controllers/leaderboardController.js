import Leaderboard from '../models/Leaderboard.js';
import Battle from '../models/Battle.js';

// Add or update leaderboard entry
export const addOrUpdateLeaderboardEntry = async (req, res) => {
  const { userId, score } = req.body;

  if (!userId || score === undefined) {
    return res.status(400).json({ message: 'User ID and score are required.' });
  }

  try {
    const existingEntry = await Leaderboard.findOne({ userId });

    if (existingEntry) {
      existingEntry.score += score;
      await existingEntry.save();
      return res.status(200).json(existingEntry);
    }

    const newEntry = new Leaderboard({ userId, score });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update leaderboard.', error });
  }
};

// Get the leaderboard
export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find()
      .populate('userId', 'name') // Include user names
      .sort({ score: -1 }); // Sort by score descending
    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve leaderboard.', error });
  }
};

// Delete a user's leaderboard entry
export const deleteLeaderboardEntry = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; // Logged-in user

  try {
    const entry = await Leaderboard.findById(id);

    if (!entry) {
      return res.status(404).json({ message: 'Entry not found.' });
    }

    if (entry.userId.toString() !== userId) {
      return res.status(403).json({ message: 'You are not authorized to delete this entry.' });
    }

    await entry.deleteOne();
    res.status(200).json({ message: 'Entry deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete leaderboard entry.', error });
  }
};

// Add a battle result and update leaderboard
export const saveBattleResult = async (req, res) => {
  const { userId, opponentId, winnerId, userScore, opponentScore } = req.body;

  if (!userId || !opponentId || !winnerId || userScore === undefined || opponentScore === undefined) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Save the battle
    const battle = new Battle({
      userId,
      opponentId,
      winner: winnerId,
      userScore,
      opponentScore,
    });
    await battle.save();

    // Update leaderboard for the winner
    await addOrUpdateLeaderboardEntry({
      body: { userId: winnerId, score: 10 },
    });

    res.status(201).json({ message: 'Battle saved and leaderboard updated successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save battle result.', error });
  }
};

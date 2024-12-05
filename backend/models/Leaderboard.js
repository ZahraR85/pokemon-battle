import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
    score: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

export default mongoose.model('Leaderboard', leaderboardSchema);

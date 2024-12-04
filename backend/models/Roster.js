import mongoose from 'mongoose';

/*const pokemonSchema = mongoose.Schema({
    name: { type: String, required: true },
    level: { type: Number, required: true },
    type: { type: String, required: true },
}); */
const rosterSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    pokemon: [{ name: String, type: String, level: Number }],
});

export default mongoose.model('Roster', rosterSchema);

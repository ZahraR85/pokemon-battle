import mongoose from 'mongoose';

const rosterSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    pokemon: [
      {
        name: { type: String, required: true },
        type: { type: String, required: true },
        level: { type: Number, required: true }
      }
    ]
  });
  
  export default mongoose.model('Roster', rosterSchema);
  
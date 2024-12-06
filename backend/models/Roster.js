import mongoose from 'mongoose';

const rosterSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    pokemon: [
        { type: String },
    ]
  });
  
  export default mongoose.model('Roster', rosterSchema);
  
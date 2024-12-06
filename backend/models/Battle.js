import mongoose from "mongoose";

const battleSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    userPokemon: { type: String, required: true },
    opponentPokemon: { type: String, required: true }, 
    winner: { type: String, required: true }, // "user" or "opponent"
    date: { type: Date, default: Date.now }, // Date of the battle
  },
  { timestamps: true }
);

const Battle = mongoose.model("Battle", battleSchema);
export default Battle;

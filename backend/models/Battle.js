import mongoose from "mongoose";

const battleSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    userPokemon: { type: String, required: true }, // Pokémon used by the user
    opponentPokemon: { type: String, required: true }, // Pokémon used by the opponent
    winner: { type: String, required: true }, // "user" or "opponent"
    date: { type: Date, default: Date.now }, // Date of the battle
  },
  { timestamps: true }
);

const Battle = mongoose.model("Battle", battleSchema);
export default Battle;

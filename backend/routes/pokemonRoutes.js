import express from 'express';
import { getAllPokemon, getPokemonDetails } from '../controllers/pokemonController.js';

const router = express.Router();

router.get('/', getAllPokemon);
router.get('/:id', getPokemonDetails);

export default router;

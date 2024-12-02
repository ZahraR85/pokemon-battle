import axios from 'axios';

export const getAllPokemon = async (req, res) => {
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
        res.json(response.data.results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPokemonDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

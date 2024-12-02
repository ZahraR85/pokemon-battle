
const PokemonCard = ({pokemon}) => {
    const pokemonId = pokemon.url.split('/')[6];
    const imgUrl = `${import.meta.env.VITE_API_POKEMON_IMG}${pokemonId}.png`;
  return (
    <div>PokemonCard {pokemon.name}</div>
  )
}

export default PokemonCard
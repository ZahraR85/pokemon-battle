import { useApp } from "../../context/AppContext";
import PokemonCard from "./PokemonCard";

const PokemonList = () => {
  const { pokemons } = useApp();

  return (
    <div>
      <ul>
        {pokemons &&
          pokemons.map((pokemon) => (
            <li key={pokemon.name}>
              <PokemonCard pokemon={pokemon} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PokemonList;

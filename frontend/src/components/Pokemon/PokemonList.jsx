import { useApp } from "../../context/AppContext";
import PokemonCard from "./PokemonCard";

const PokemonList = () => {
  const { pokemons, previous, next, fetchPokemons } = useApp();

  const handlePagination = (url) => {
    fetchPokemons(url);
  };

  return (
    <>
      <ul className="max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 my-8">
        {pokemons &&
          pokemons.map((pokemon) => (
            <li key={pokemon.name}>
              <PokemonCard pokemon={pokemon} />
            </li>
          ))}
      </ul>
      <div className="join grid grid-cols-2 max-w-screen-lg mx-auto">
        <button
          className="join-item btn"
          disabled={!previous}
          onClick={() => handlePagination(previous)}
        >
          Previous
        </button>
        <button
          className="join-item btn"
          disabled={!next}
          onClick={() => handlePagination(next)}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default PokemonList;

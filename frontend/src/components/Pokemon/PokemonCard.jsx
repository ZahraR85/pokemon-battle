import { Link } from "react-router-dom";

const PokemonCard = ({ pokemon }) => {
  const pokemonId = pokemon.url.split("/")[6];
  const imgUrl = `${import.meta.env.VITE_API_POKEMON_IMG}${pokemonId}.png`;
  return (
    <div className="card card-compact bg-base-100 w-full shadow-xl">
      <figure className="">
        <img src={imgUrl} alt={pokemon.name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{pokemon.name}</h2>
        <div className="card-actions justify-end">
          <Link to={`/pokemon/${pokemon.name}`} className="btn">details</Link>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;

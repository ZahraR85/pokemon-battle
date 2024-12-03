import { Link } from "react-router-dom";

const BattleCard = ({ pokemon, owner }) => {
  const imgUrl = `${import.meta.env.VITE_API_POKEMON_IMG}${pokemon.id}.png`;
  return (
    <div className="card card-compact bg-base-100 w-full shadow-xl">
      <figure>
        <img src={imgUrl} alt={pokemon.name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{owner} {pokemon.name}</h2>
        <p>Attack: {pokemon.stats[1].base_stat}</p>
        <div className="card-actions justify-end">
          <Link to={`/pokemon/${pokemon.name}`} className="btn">details</Link>
        </div>
      </div>
    </div>
  );
};

export default BattleCard;

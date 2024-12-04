import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BattleCard = ({ pokemon, owner, winner }) => {
  const [isWinner, setIsWinner] = useState(false);
  const imgUrl = `${import.meta.env.VITE_API_POKEMON_IMG}${pokemon.id}.png`;
  useEffect(() => {
    console.log(winner);
    if (winner && winner === owner) {
      setIsWinner(true);
    }
  }, [winner]);
  return (
    <div className="card card-compact bg-base-100 w-full shadow-xl">
      <figure>
        <img src={imgUrl} alt={pokemon.name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {owner} {pokemon.name}
          {isWinner && (
            <div className="badge badge-accent badge-outline">winner!</div>
          )}
        </h2>
        <ul>
          {pokemon.stats.map((stat) => (
            <li key={stat.id}>
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
        <div className="card-actions justify-end">
          <Link to={`/pokemon/${pokemon.name}`} className="btn">
            details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BattleCard;

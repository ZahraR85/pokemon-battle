import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useApp } from "../../context/AppContext";

const PokemonDetails = () => {
  const { setUserPokemon, findInRoster, addToRoster, removeFromRoster } =
    useApp();
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPokemon(`${import.meta.env.VITE_API_POKEMON}/${name}`);
  }, [name]);

  const fetchPokemon = async (url) => {
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setPokemon(response.data);
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  const handleBattle = () => {
    setUserPokemon(pokemon);
    navigate("/battle");
  };

  const handleAddToRoster = () => {
    addToRoster(pokemon.name);
    navigate("/roster");
  };

  const handleRemoveFromRoster = () => {
    removeFromRoster(pokemon);
    navigate("/roster");
  };

  return (
    <>
      {pokemon && (
        <div className="card card-compact bg-base-100 max-w-screen-lg mx-auto shadow-xl">
          <figure>
            <img
              src={`${import.meta.env.VITE_API_POKEMON_IMG}/${pokemon.id}.png`}
              alt={pokemon.name}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{pokemon.name}</h2>
            <ul>
              {pokemon.stats.map((stat) => (
                <li key={stat.id}>
                  {stat.stat.name}: {stat.base_stat}
                </li>
              ))}
            </ul>
            <div className="card-actions justify-end">
              {findInRoster(pokemon.name) ? (
                <button
                  className="btn"
                  onClick={() => handleRemoveFromRoster()}
                >
                  remove from roster
                </button>
              ) : (
                <button className="btn" onClick={() => handleAddToRoster()}>
                  add to roster
                </button>
              )}
              <button className="btn" onClick={() => handleBattle()}>
                battle
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PokemonDetails;

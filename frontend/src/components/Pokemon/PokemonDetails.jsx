import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useApp } from "../../context/AppContext";

const PokemonDetails = () => {
  const { setUserPokemon, fetchPokemonByUrl } = useApp();
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
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
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

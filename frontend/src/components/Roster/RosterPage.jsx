/*import { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";
import BattleCard from "../Battle/BattleCard";
import { toast } from "react-toastify";
import axios from "axios";

const RosterPage = () => {
  const { roster } = useApp();
  const [myRoster, setMyRoster] = useState([]);
  let tester = [];

  useEffect(() => {
    if (roster === tester) return;

    setMyRoster([]);

    roster.map((pokemonName) => {
      fetchPokemonByUrl(`${import.meta.env.VITE_API_POKEMON}/${pokemonName}`);
    });
    tester = roster;
  }, [roster]);

  const fetchPokemonByUrl = async (url) => {
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setMyRoster((prev) => [...prev, response.data]);
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  }; 
  return (
    <>
      <ul className="max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 my-8">
        {myRoster &&
          myRoster.map((pokemon) => (
            <li key={pokemon.name}>
              <BattleCard pokemon={pokemon} />
            </li>
          ))}
      </ul>
    </>
  );
};

export default RosterPage; */
import { useEffect, useState } from 'react';

const Roster = ({ api }) => {
    const [roster, setRoster] = useState([]);

    useEffect(() => {
        const fetchRoster = async () => {
            const response = await api.get('/api/rosters');
            setRoster(response.data.pokemons || []);
        };

        fetchRoster();
    }, [api]);

    return (
        <div>
            <h1>Your Pokémon Roster</h1>
            {roster.map(pokemon => (
                <div key={pokemon.id}>
                    {pokemon.name} - Level: {pokemon.level} - Type: {pokemon.type}
                </div>
            ))}
        </div>
    );
};

export default Roster;


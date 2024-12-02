import { useEffect } from "react";
import { useApp } from "../../context/AppContext";
import BattleCard from "./BattleCard";

const BattlePage = () => {
  const { count, fetchPokemonByUrl, userPokemon, opponentPokemon } = useApp();
  useEffect(() => {
    const randomId = Math.floor(Math.random() * count) + 1;
    const randomPokemonUrl = `${import.meta.env.VITE_API_POKEMON}/${randomId}`;
    fetchPokemonByUrl(randomPokemonUrl, "opponent");
  }, []);

  return (
    <ul className="max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 my-8">
      <li>{userPokemon && <BattleCard pokemon={userPokemon} owner="user" />}</li>
      <li>{opponentPokemon && <BattleCard pokemon={opponentPokemon} owner="opponent" />}</li>
    </ul>
  );
};

export default BattlePage;

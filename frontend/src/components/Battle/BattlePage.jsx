import { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";
import BattleCard from "./BattleCard";
import { toast } from "react-toastify";

const BattlePage = () => {
  const { fetchPokemonByUrl, userPokemon, opponentPokemon, saveBattle } =
    useApp();

  const [loading, setLoading] = useState(true);
  const [winnerPokemon, setWinnerPokemon] = useState(null);
  const [winner, setWinner] = useState(null);
  const [statUsedToFight,setStatUsedToFight] = useState(null);

  useEffect(() => {

    // const randomId = Math.floor(Math.random() * count) + 1;
    // some pokemons over 1000 are faulty
    const randomId = Math.floor(Math.random() * 1000) + 1;
    const randomPokemonUrl = `${import.meta.env.VITE_API_POKEMON}/${randomId}`;
    fetchPokemonByUrl(randomPokemonUrl, "opponent");
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [opponentPokemon]);

  const handleFight = () => {
    // using random stats to define winner:
    toast.info("picking random stat for fighting");
    const randomStat = Math.floor(Math.random() * userPokemon.stats.length);
    setStatUsedToFight(userPokemon.stats[randomStat].stat.name);
    toast.info(`chose "${statUsedToFight}"`);

    const userPokemonAttack = userPokemon.stats[randomStat].base_stat;
    const opponentPokemonAttack = opponentPokemon.stats[randomStat].base_stat;

    if (userPokemonAttack > opponentPokemonAttack) {
      setWinnerPokemon(userPokemon);
      toast.success(`your pokemon won`);
      setWinner("user");
    } else if (userPokemonAttack < opponentPokemonAttack) {
      setWinnerPokemon(opponentPokemon);
      toast.error(`opponent pokemon won`);
      setWinner("opponent");
    } else {
      toast.warning(`it's a draw`);
    }
  };

  const handleSave = () => {
    const result = {
      userPokemon,
      opponentPokemon,
      winner,
      statUsedToFight,
    };

    saveBattle(result);
  };

  return (
    <>
      <ul className="max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 my-8">
        <li>
          {userPokemon && (
            <BattleCard pokemon={userPokemon} owner="user" winner={winner} />
          )}
        </li>
        <li>
          {opponentPokemon && (
            <BattleCard
              pokemon={opponentPokemon}
              owner="opponent"
              winner={winner}
            />
          )}
        </li>
      </ul>
      <div className="max-w-screen-lg mx-auto p-4 my-8 text-center">
        {winnerPokemon ? (
          <button className="btn btn-accent" onClick={() => handleSave()}>
            save battle
          </button>
        ) : (
          <button
            className="btn btn-secondary"
            onClick={() => handleFight()}
            disabled={loading}
          >
            fight!
          </button>
        )}
      </div>
    </>
  );
};

export default BattlePage;

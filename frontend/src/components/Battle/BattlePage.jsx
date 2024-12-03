import { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";
import BattleCard from "./BattleCard";
import { toast } from "react-toastify";

const BattlePage = () => {
  const { count, fetchPokemonByUrl, userPokemon, opponentPokemon, saveBattle } =
    useApp();

  const [loading, setLoading] = useState(true);
  const [winnerPokemon, setWinnerPokemon] = useState(null);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const randomId = Math.floor(Math.random() * count) + 1;
    const randomPokemonUrl = `${import.meta.env.VITE_API_POKEMON}/${randomId}`;
    fetchPokemonByUrl(randomPokemonUrl, "opponent");
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [opponentPokemon]);

  const handleFight = () => {
    // using "attack" stats to define winner:
    const userPokemonAttack = userPokemon.stats[1].base_stat;
    const opponentPokemonAttack = opponentPokemon.stats[1].base_stat;

    if (userPokemonAttack > opponentPokemonAttack) {
      setWinnerPokemon(userPokemon);
      toast.success("your pokemon won");
      setWinner("user");
    } else if (userPokemonAttack < opponentPokemonAttack) {
      setWinnerPokemon(opponentPokemon);
      toast.error("opponent pokemon won");
      setWinner("opponent");
    } else {
      toast.warning("it's a draw");
    }
  };

  const handleSave = () => {
    const result = {
      userPokemon,
      opponentPokemon,
      winner
    }

    saveBattle(result);
  };

  return (
    <>
      <ul className="max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 my-8">
        <li>
          {userPokemon && <BattleCard pokemon={userPokemon} owner="user" />}
        </li>
        <li>
          {opponentPokemon && (
            <BattleCard pokemon={opponentPokemon} owner="opponent" />
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

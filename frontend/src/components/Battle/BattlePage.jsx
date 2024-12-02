import { useApp } from "../../context/AppContext";

const BattlePage = () => {
  const { count,fetchPokemonByUrl } = useApp();

  
  const randomId = Math.floor(Math.random() * count) + 1;
  const randomPokemonUrl = `${import.meta.env.VITE_API_POKEMON}/${randomId}`;
  fetchPokemonByUrl(randomPokemonUrl,'opponent');

  return <div>BattlePage</div>;
};

export default BattlePage;

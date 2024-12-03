import { useApp } from "../../context/AppContext";
import BattleCard from "../Battle/BattleCard";

const RosterPage = () => {
  const {roster} = useApp()
  return (
    <>
    <ul className="max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 my-8">
      {roster &&
        roster.map((pokemon) => (
          <li key={pokemon.name}>
            <BattleCard pokemon={pokemon} />
          </li>
        ))}
    </ul>
  </>

  );
};

export default RosterPage;

import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const ContextProvider = ({ children }) => {
  // the app user
  const [appUser, setAppUser] = useState(null);
  // pokemon-list
  const [limit, setLimit] = useState(18);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [next, setNext] = useState(null);
  const [pokemons, setPokemons] = useState(null);
  // pokemon single, selected by user
  const [userPokemon, setUserPokemon] = useState(null);
  const [opponentPokemon, setOpponentPokemon] = useState(null);
  // roster
  const [roster, setRoster] = useState([]);

  /**
   * fetches a list of pokemons
   */
  const fetchPokemons = async (url) => {
    try {
      const urlToFetch =
        url ||
        `${import.meta.env.VITE_API_POKEMON}?offset=${offset}&limit=${limit}`;
      const response = await axios.get(urlToFetch, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setCount(response.data.count);
      setPrevious(response.data.previous);
      setNext(response.data.next);
      setPokemons(response.data.results);
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  /**
   * fetches a single pokemon by it's id
   * @param {String} url the url of the pokemoon
   * @param {String} owner  the owner of the pokemon ("user" or "opponent")
   */
  const fetchPokemonByUrl = async (url, owner) => {
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (owner === "user") {
        setUserPokemon(response.data);
      } else if (owner === "opponent") {
        setOpponentPokemon(response.data);
      } else {
        return response.data;
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  // fetch the initial pokemon list
  useEffect(() => {
    fetchPokemons();
  }, []);

  /**
   * adds a pokemon to the roster
   * @param {Object} pokemon
   * @returns
   */
  const addToRoster = (pokemon) => {
    if (findInRoster(pokemon)) {
      toast.warning(`${pokemon.name} is already on your roster`);
      return;
    }
    setRoster([...roster, pokemon]);

    // TODO: save to db
  };

  /**
   * removes a pokemon from the roster
   * @param {Object} pokemon
   */
  const removeFromRoster = (pokemon) => {
    const res = roster.filter((element) => element.id !== pokemon.id);
    setRoster(res);

    // TODO: save to db
  };

  /**
   * finds a pokemon in the roster
   * @param {Object} pokemon
   */
  const findInRoster = (pokemon) => {
    return roster.find((element) => element.id === pokemon.id);
  };

  return (
    <AppContext.Provider
      value={{
        // for user stuff
        appUser,
        setAppUser,

        // for list api calls
        limit,
        setLimit,
        offset,
        setOffset,
        count,
        next,
        previous,
        fetchPokemons,
        pokemons,

        // single pokemon stuff
        fetchPokemonByUrl,
        userPokemon,
        setUserPokemon,
        opponentPokemon,
        setOpponentPokemon,

        // roster
        roster,
        setRoster,

        addToRoster,
        removeFromRoster,
        findInRoster,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;

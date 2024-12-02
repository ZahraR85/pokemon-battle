import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const ContextProvider = ({ children }) => {
  // the app user
  const [appUser, setAppUser] = useState(null);
  // pokemon-list
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [next, setNext] = useState(null);
  const [pokemons, setPokemons] = useState(null);
  // pokemon single, selected by user
  const [userPokemon, setUserPokemon] = useState(null);
  const [opponentPokemon, setOpponentPokemon] = useState(null);

  /**
   * fetches a list of pokemons
   */
  const fetchPokemons = async (url) => {
    try {
      const urlToFetch = url || `${import.meta.env.VITE_API_POKEMON}?offset=${offset}&limit=${limit}`;
      const response = await axios.get(
        urlToFetch,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
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
      const response = await axios.get(
        url,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (owner === "user") {
        setUserPokemon(response.data);
      } else {
        setOpponentPokemon(response.data);
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  // fetch the initial pokemon list
  useEffect(() => {
    fetchPokemons();
  }, []);

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
        pokemons,

        // single pokemon stuff
        fetchPokemonByUrl,
        pokemon: userPokemon,
        setUserPokemon,
        opponentPokemon,
        setOpponentPokemon,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;

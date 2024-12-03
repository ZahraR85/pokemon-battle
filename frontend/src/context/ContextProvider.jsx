import { useEffect, useReducer, useState } from "react";
import { AppContext } from "./AppContext";
import { toast } from "react-toastify";
import axios from "axios";

import { fakeData } from "../data/fakeData";

const ContextProvider = ({ children }) => {
  // all users
  const [users, setUsers] = useState(null);
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
  // leaderboard
  const [leaderboard, setLeaderboard] = useState();

  const fetchUser = (id) => {
    // TODO: fetch user from db & setAppUser(...) && setRoster() (full pokemons!!!)
  };

  const fetchUsers = (id) => {
    // TODO: fetch users from db (replace the fake)
    setUsers(fakeData.users);
  };

  const fetchLeaderboard = (id) => {
    // TODO: fetch leaderboard from db & setLeaderboard(...)
    setLeaderboard(fakeData.leaderboard);
  };

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

  // fetch the initial data
  useEffect(() => {
    fetchPokemons();
    fetchUsers();
    fetchLeaderboard();
  }, []);

  useEffect(() => {
    if (appUser && appUser.roster) {
      setRoster(appUser.roster);
    }
  }, [appUser]);

  /**
   * adds a pokemon to the roster
   * @param {String} pokemonName
   * @returns
   */
  const addToRoster = (pokemonName) => {
    const found = findInRoster(pokemonName)
    if (found ) {
      toast.warning(`pokemon is already on your roster`);
      return;
    }
    setRoster([...roster, pokemonName]);

    // TODO: save to db
  };

  /**
   * removes a pokemon from the roster
   * @param {Object} pokemon
   */
  const removeFromRoster = (pokemon) => {
    const res = roster.filter((element) => element !== pokemon.name);
    setRoster(res);

    // TODO: save to db
  };

  /**
   * finds a pokemon in the roster
   * @param {String} pokemonName
   */
  const findInRoster = (pokemonName) => {
    return roster.find((element) => element === pokemonName);
  };

  /**
   * saves the battle results to db
   * @param {Object} result
   */
  const saveBattle = (result) => {
    // const result = {
    //   userPokemon,
    //   opponentPokemon,
    //   winner
    // }

    console.log(result);

    // TODO: save to db
  };

  return (
    <AppContext.Provider
      value={{
        // for user stuff
        users,
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

        saveBattle,
        leaderboard,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;

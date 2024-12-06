import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { endpoints } from "../api/api";

const ContextProvider = ({ children }) => {
  // App states
  const [users, setUsers] = useState(null); // all users
  const [appUser, setAppUser] = useState(null); // logged-in user
  const [limit, setLimit] = useState(18);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [next, setNext] = useState(null);
  const [pokemons, setPokemons] = useState(null); // Pokémon list
  const [userPokemon, setUserPokemon] = useState(null); // user's Pokémon
  const [opponentPokemon, setOpponentPokemon] = useState(null); // opponent's Pokémon
  const [roster, setRoster] = useState([]); // user's roster
  const [leaderboard, setLeaderboard] = useState([]); // leaderboard
  const [authToken, setAuthToken] = useState(null); // JWT token
  const [loading, setLoading] = useState(false); // global loading state

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    saveRoster();
  }, [roster]);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      toast.error("Failed to fetch users: " + error.message);
    }
  };

  // Login user
  const loginUser = async (email, password) => {
    try {
      setLoading(true);
      const response = await axios.post(`${endpoints.auth.login}`, {
        email,
        password,
      });
      setAppUser(response.data.user);
      setAuthToken(response.data.token);
      toast.success("Login successful!");
    } catch (error) {
      toast.error("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Register user
  const registerUser = async (userDetails) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_BASE_URL}/auth/register`,
        userDetails
      );
      setAppUser(response.data.user);
      setAuthToken(response.data.token);
      toast.success("Registration successful!");
    } catch (error) {
      toast.error("Registration failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logoutUser = () => {
    setAppUser(null);
    setAuthToken(null);
    toast.info("Logged out.");
  };

  // Fetch Pokémon
  const fetchPokemons = async (
    url = `${import.meta.env.VITE_API_POKEMON}?limit=${limit}&offset=${offset}`
  ) => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      setPokemons(response.data.results);
      setCount(response.data.count);
      setPrevious(response.data.previous);
      setNext(response.data.next);
    } catch (error) {
      toast.error("Failed to fetch Pokémon: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Pokémon by URL
  const fetchPokemonByUrl = async (url, ownerType) => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      if (ownerType === "user") setUserPokemon(response.data);
      else if (ownerType === "opponent") setOpponentPokemon(response.data);
    } catch (error) {
      toast.error("Failed to fetch Pokémon: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Save battle results
  const saveBattle = async (battle) => {
    const data = {
      userId: appUser._id,
      userPokemon: battle.userPokemon.name,
      opponentPokemon: battle.opponentPokemon.name,
      winner: battle.winner,
    };
    try {
      await axios.post(`${endpoints.battle.base}`, data, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      toast.success("Battle saved!");
    } catch (error) {
      toast.error("Failed to save battle: " + error.message);
    }
  };

  // Fetch leaderboard
  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/leaderboard`);
      setLeaderboard(response.data);
    } catch (error) {
      toast.error("Failed to fetch leaderboard: " + error.message);
    }
  };

  // Add to roster
  const addToRoster = async (pokemon) => {
    const pokemonName = pokemon.name;
    if (!roster.includes(pokemonName)) {
      setRoster((prev) => [...prev, pokemonName]);
      toast.success(`${pokemonName} added to roster!`);
    } else {
      toast.warning(`${pokemonName} is already in the roster.`);
    }
  };

  // Remove from roster
  const removeFromRoster = async (pokemon) => {
    const pokemonName = pokemon.name;
    setRoster((prev) => prev.filter((name) => name !== pokemonName));
    toast.info(`${pokemonName} removed from roster.`);
  };

  const saveRoster = async () => {
    if (!appUser) return;
    const data = {
      userId: appUser._id,
      pokemon: roster,
    };

    try {
      await axios.post(`${endpoints.roster.base}`, data, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      // toast.success("Roster saved!");
    } catch (error) {
      toast.error("Failed to save roster: " + error.message);
    }
  };

  const getUserRoster = async () => {
    if(!authToken) return;
    const response = await axios.get(`${endpoints.roster.base}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    console.log(response.data);
    setRoster(response.data.pokemon || []);
  };

  /**
   * finds a pokemon in the roster
   * @param {Object} pokemon
   */
  const findInRoster = (pokemon) => {
    console.log(pokemon.name);
    return roster.find((element) => element === pokemon.name);
  };

  // Effect to fetch initial data
  useEffect(() => {
    // fetchUsers();
    fetchLeaderboard();
    fetchPokemons();
  }, []);

  return (
    <AppContext.Provider
      value={{
        users,
        appUser,
        setAppUser,
        loginUser,
        registerUser,
        logoutUser,
        authToken,
        setAuthToken,
        pokemons,
        fetchPokemons,
        userPokemon,
        setUserPokemon,
        opponentPokemon,
        setOpponentPokemon,
        fetchPokemonByUrl,
        addToRoster,
        removeFromRoster,
        getUserRoster,
        roster,
        setRoster,
        saveBattle,
        leaderboard,
        loading,

        count,
        previous,
        next,
        findInRoster,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;

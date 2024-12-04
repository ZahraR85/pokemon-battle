const API_BASE_URL = "http://localhost:5000/api";

export const endpoints = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    signup: `${API_BASE_URL}/auth/signup`,
    profile: `${API_BASE_URL}/auth/profile`,
  },
  battle: {
    base: `${API_BASE_URL}/battles`,
    byId: (id) => `${API_BASE_URL}/battles/${id}`,
  },
  roster: {
    base: `${API_BASE_URL}/rosters`,
    byId: (id) => `${API_BASE_URL}/rosters/${id}`,
  },
  leaderboard: {
    base: `${API_BASE_URL}/leaderboards`,
    byId: (id) => `${API_BASE_URL}/leaderboards/${id}`,
  },
  pokemon: {
    base: `${API_BASE_URL}/pokemon`,
    byId: (id) => `${API_BASE_URL}/pokemon/${id}`,
  },
};

export default API_BASE_URL;

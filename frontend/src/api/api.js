const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const endpoints = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    signup: `${API_BASE_URL}/auth/signup`,
    profile: `${API_BASE_URL}/auth/profile`,
  },
  battle: {
    base: `${API_BASE_URL}/battle`,
    byId: (id) => `${API_BASE_URL}/battle/${id}`,
  },
  roster: {
    base: `${API_BASE_URL}/roster`,
    byId: (id) => `${API_BASE_URL}/roster/${id}`,
  },
  leaderboard: {
    base: `${API_BASE_URL}/leaderboard`,
    byId: (id) => `${API_BASE_URL}/leaderboard/${id}`,
  },
  pokemon: {
    base: `${API_BASE_URL}/pokemon`,
    byId: (id) => `${API_BASE_URL}/pokemon/${id}`,
  },
};

export default API_BASE_URL;

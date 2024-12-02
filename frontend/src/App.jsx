import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import PokemonDetails from "./components/Pokemon/PokemonDetails.jsx";
import RosterPage from "./components/Roster/RosterPage.jsx";
import BattlePage from "./components/Battle/BattlePage.jsx";
import LeaderboardPage from "./components/Leaderboard/LeaderboardPage.jsx";
import LoginForm from "./components/Authentication/LoginForm.jsx";
import SignupForm from "./components/Authentication/SignupForm.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pokemon/:name" element={<PokemonDetails />} />
        <Route path="/roster" element={<RosterPage />} />
        <Route path="/battle" element={<BattlePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

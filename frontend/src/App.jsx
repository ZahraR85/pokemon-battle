import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import PokemonDetails from "./components/Pokemon/PokemonDetails.jsx";
import RosterPage from "./components/Roster/RosterPage.jsx";
import BattlePage from "./components/Battle/BattlePage.jsx";
import LeaderboardPage from "./components/Leaderboard/LeaderboardPage.jsx";
import LoginForm from "./components/Authentication/LoginForm.jsx";
import SignupForm from "./components/Authentication/SignupForm.jsx";
import Layout from "./pages/Layout.jsx";
import PokemonList from "./components/Pokemon/PokemonList.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="/pokemon">
        <Route index element={<PokemonList />} />
        <Route path=":name" element={<PokemonDetails />} />
      </Route>
      <Route path="/roster" element={<RosterPage />} />
      <Route path="/battle" element={<BattlePage />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

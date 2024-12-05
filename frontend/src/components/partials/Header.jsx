import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const Header = () => {
  const { appUser, logoutUser } = useContext(AppContext);

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">
        <Link to="/" className="hover:text-gray-300">
          Pokémon Battle
        </Link>
      </h1>
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/pokemon" className="hover:text-gray-300">
              Pokémon
            </Link>
          </li>
          {appUser && (
            <li>
              <Link to="/roster" className="hover:text-gray-300">
                Roster
              </Link>
            </li>
          )}
          <li>
            <Link to="/battle" className="hover:text-gray-300">
              Battle
            </Link>
          </li>
          <li>
            <Link to="/leaderboard" className="hover:text-gray-300">
              Leaderboard
            </Link>
          </li>
          {appUser ? (
            <>
              <li>Welcome, {appUser.name}!</li>
              <li>
                <button
                  onClick={logoutUser}
                  className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="bg-green-600 hover:bg-green-500 px-3 py-1 rounded"
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

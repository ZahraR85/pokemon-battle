import { NavLink } from "react-router-dom";
import { useApp } from "../../context/AppContext";

const Header = () => {
  const { userPokemon, users, setAppUser, setRoster } = useApp();

  const handleChange = (e) => {
    const id = parseInt(e.target.value);
    const user = getUserById(id);
    setRoster([])
    setAppUser({ ...user });
  };

  const getUserById = (id) => {
    return users.find((u) => u.id === id);
  };

  return (
    <header className="z-10">
      <nav className="navbar bg-base-100 shadow-xl">
        <div className="flex-1">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/pokemon" className="text-nowrap">
                  pokemons
                </NavLink>
              </li>
              <li>
                <NavLink to="/roster" className="text-nowrap">
                  roster
                </NavLink>
              </li>
              {userPokemon && (
                <li>
                  <NavLink to="/battle" className="text-nowrap">
                    battle
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink to="/leaderboard" className="text-nowrap">
                  leaderboard
                </NavLink>
              </li>
            </ul>
          </div>
          <NavLink to="/" className="btn btn-ghost text-xl">
            Pokemon Battle
          </NavLink>
        </div>

        <div className="flex-none hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/pokemon" className="text-nowrap">
                pokemons
              </NavLink>
            </li>
            <li>
              <NavLink to="/roster" className="text-nowrap">
                roster
              </NavLink>
            </li>
            {userPokemon && (
              <li>
                <NavLink to="/battle" className="text-nowrap">
                  battle
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to="/leaderboard" className="text-nowrap">
                leaderboard
              </NavLink>
            </li>
          </ul>
          <div className="form-control">
            <select
              name="user"
              className="select select-bordered w-full max-w-xs"
              onChange={handleChange}
            >
              <option>select user...</option>
              {users &&
                users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

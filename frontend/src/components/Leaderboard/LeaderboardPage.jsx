import { useApp } from "../../context/AppContext";

const LeaderboardPage = () => {
  const {leaderboard} = useApp();
  return (
    <>
    <ul className="max-w-screen-lg mx-auto p-4 my-8">
      {leaderboard &&
        leaderboard.map((user) => (
          <li key={user.id}>
            {user.username}, score: {user.score}
          </li>
        ))}
    </ul>
  </>

  );
};

export default LeaderboardPage;

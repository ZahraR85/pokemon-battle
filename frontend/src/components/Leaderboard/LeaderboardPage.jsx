import { useEffect } from "react";
import { useApp } from "../../context/AppContext";

const LeaderboardPage = () => {
  const {leaderboard,fetchLeaderboard} = useApp();

  useEffect(()=>{
    fetchLeaderboard()
  },[])

  return (
    <>
    <ul className="max-w-screen-lg mx-auto p-4 my-8">
      {leaderboard &&
        leaderboard.map((user) => (
          <li key={user._id}>
            {user.username}, score: {user.score}
          </li>
        ))}
    </ul>
  </>

  );
};

export default LeaderboardPage;

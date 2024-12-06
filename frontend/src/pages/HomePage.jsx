import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(/pokemon-battle-pikachu-mewtwo.900x.jpg)",
          backgroundSize:"cover",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Welcome to the epic Pokémon Battle!</h1>
          <p className="mb-5">
            Tighten your belts ang proceed to fight!.
          </p>
          <Link to="/login" className="btn btn-primary">Get Started</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

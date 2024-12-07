"use client";

import { useEffect } from "react";
import Leaderboard from "../components/Home/Leaderboard";

const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = "Yale IMs";
  }, []);

  return (
    <div className="min-h-screen p-8">
      <br />
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Leaderboard</h1>
      <Leaderboard />
    </div>
  );
};

export default HomePage;

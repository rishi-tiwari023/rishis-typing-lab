import React, { useState, useEffect } from "react";
import TypingBox from "./components/TypingBox";
import StatsChart from "./components/StatsChart";
import { clearStats } from "./utils/saveStatsToCookies";
import "./App.css";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved
      ? JSON.parse(saved)
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleClearStats = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all your typing statistics?"
      )
    ) {
      clearStats();
      window.location.reload();
    }
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "dark bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold dark:text-white">
            Rishi's Typing Lab
          </h1>
          <div className="flex gap-4">
            <button
              onClick={handleClearStats}
              className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Clear Stats
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {isDarkMode ? "🌞" : "🌙"}
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-8">
          <TypingBox />
          <StatsChart />
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Progress from "./pages/Progress";
import Test from "./pages/Test";
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
    <Router>
      <div
        className={`min-h-screen flex flex-col ${
          isDarkMode ? "dark bg-gray-900" : "bg-gray-100"
        }`}
      >
        <Navbar
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          handleClearStats={handleClearStats}
        />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<Test />} />
            <Route path="/progress" element={<Progress />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

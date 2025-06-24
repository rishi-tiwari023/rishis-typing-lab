import React, { useEffect, useState } from "react";
import { getStatsFromCookies } from "../utils/saveStatsToCookies";
import axios from "axios";

const API_URL = "http://localhost:3000/leaderboard";

const Leaderboard = () => {
  const [topScores, setTopScores] = useState([]);
  const [name, setName] = useState("");
  const [lastStat, setLastStat] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // Fetch leaderboard from backend
  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get(API_URL);
      setTopScores(res.data);
    } catch (e) {
      setTopScores([]);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    // Get last stat for submission
    const stats = getStatsFromCookies();
    if (Array.isArray(stats) && stats.length > 0) {
      setLastStat(stats[stats.length - 1]);
    } else if (stats) {
      setLastStat(stats);
    }
  }, []);

  // Submit score to backend
  const submitScore = async () => {
    if (!name || !lastStat) return;
    try {
      await axios.post(API_URL, {
        name,
        wpm: lastStat.wpm,
        accuracy: lastStat.accuracy,
        date: lastStat.date,
      });
      setSubmitted(true);
      fetchLeaderboard();
    } catch (e) {
      alert("Failed to submit score.");
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow mt-4">
      <h2 className="text-lg font-semibold mb-2">Leaderboard (Global)</h2>
      {lastStat && !submitted && (
        <div className="mb-4 flex flex-col sm:flex-row gap-2 items-start sm:items-center">
          <input
            className="border rounded px-2 py-1 text-gray-900 dark:text-gray-800"
            placeholder="Enter your name"
            value={name}
            onChange={e => setName(e.target.value)}
            maxLength={16}
          />
          <button
            className="px-4 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
            onClick={submitScore}
            disabled={!name}
          >
            Submit Score
          </button>
        </div>
      )}
      {topScores.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-200">No scores yet. Be the first!</p>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="py-1">#</th>
              <th className="py-1">Name</th>
              <th className="py-1">WPM</th>
              <th className="py-1">Accuracy</th>
              <th className="py-1">Date</th>
            </tr>
          </thead>
          <tbody>
            {topScores.map((s, i) => (
              <tr key={i} className="border-t border-gray-200 dark:border-gray-700">
                <td className="py-1">{i + 1}</td>
                <td className="py-1 font-bold">{s.name}</td>
                <td className="py-1 font-bold">{s.wpm}</td>
                <td className="py-1">{s.accuracy}%</td>
                <td className="py-1 text-xs">{s.date ? new Date(s.date).toLocaleString() : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard; 
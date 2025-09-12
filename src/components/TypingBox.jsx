import React, { useEffect, useState, useRef } from "react";
import useTypingTracker from "../hooks/useTypingTracker";
import { getRandomSentence } from "../utils/getRandomSentence";
import { saveStatsToCookies } from "../utils/saveStatsToCookies";
import ProgressBar from "./ProgressBar";

const TypingBox = () => {
  const [sentence, setSentence] = useState("");
  const [loading, setLoading] = useState(true);
  const [duration, setDuration] = useState(30); // 15, 30, 60, 120
  const inputRef = useRef(null);
  const {
    typed,
    errors,
    wpm,
    accuracy,
    isComplete,
    remainingSeconds,
    handleInput,
    reset,
  } = useTypingTracker(sentence, duration);

  // Fetch sentence on mount or reload
  const loadSentence = async () => {
    setLoading(true);
    const s = await getRandomSentence();
    setSentence(s);
    setLoading(false);
    reset();
    setTimeout(() => inputRef.current && inputRef.current.focus(), 100);
  };

  useEffect(() => {
    loadSentence();
    // eslint-disable-next-line
  }, []);

  // Save stats to cookies on completion
  useEffect(() => {
    if (isComplete) {
      saveStatsToCookies({ wpm, accuracy, errors, raw: typed, sentence, date: new Date(), duration });
    }
    // eslint-disable-next-line
  }, [isComplete]);

  // Render sentence with highlighting
  const renderSentence = () => {
    return (
      <div className="text-lg font-mono text-center mb-4">
        {sentence.split("").map((char, idx) => {
          let className = "";
          if (idx < typed.length) {
            className =
              typed[idx] === char
                ? "text-green-600 dark:text-green-400"
                : "text-red-500 dark:text-red-400 underline";
          } else if (idx === typed.length && !isComplete) {
            className = "bg-blue-200 dark:bg-blue-700 animate-pulse"; // cursor
          }
          return (
            <span key={idx} className={className}>
              {char}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full p-6 bg-white dark:bg-gray-800 rounded shadow">
      {/* Duration selector */}
      <div className="flex items-center justify-center gap-2 mb-4">
        {[15, 30, 60, 120].map((d) => (
          <button
            key={d}
            className={`px-3 py-1 rounded text-sm border transition-colors ${duration === d
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-transparent text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            onClick={() => {
              setDuration(d);
              reset();
              setTimeout(() => inputRef.current && inputRef.current.focus(), 50);
            }}
            disabled={loading}
          >
            {d}s
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      {!loading && (
        <ProgressBar
          typed={typed}
          sentence={sentence}
          wpm={wpm}
          accuracy={accuracy}
          isComplete={isComplete}
        />
      )}

      <div className="mb-6">
        {loading ? (
          <div className="text-center text-gray-600 dark:text-gray-400">Loading...</div>
        ) : (
          renderSentence()
        )}
      </div>

      <div className="flex flex-col items-center gap-4">
        <input
          ref={inputRef}
          type="text"
          className="w-full p-3 border rounded bg-gray-50 dark:bg-gray-900 text-lg font-mono outline-none text-center"
          value={typed}
          onChange={e => handleInput(e.target.value)}
          disabled={loading || isComplete}
          placeholder={loading ? "Loading..." : "Start typing here..."}
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
        <div className="flex justify-center gap-6 text-sm">
          <span className="text-gray-700 dark:text-gray-300">WPM: <b>{wpm}</b></span>
          <span className="text-gray-700 dark:text-gray-300">Time: <b>{remainingSeconds ?? duration}s</b></span>
          {isComplete && <span className="text-green-600 dark:text-green-400 font-semibold">Completed!</span>}
        </div>
        <div className="flex gap-3 mt-2">
          <button
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            onClick={loadSentence}
            disabled={loading}
          >
            {loading ? "Loading..." : "New Sentence"}
          </button>
          <button
            className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
            onClick={() => {
              reset();
              setTimeout(() => inputRef.current && inputRef.current.focus(), 100);
            }}
            disabled={loading}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default TypingBox; 
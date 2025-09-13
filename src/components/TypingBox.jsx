import React, { useEffect, useState, useRef } from "react";
import useTypingTracker from "../hooks/useTypingTracker";
import { getRandomSentence } from "../utils/getRandomSentence";
import { useNavigate } from "react-router-dom";
import { saveStatsToCookies } from "../utils/saveStatsToCookies";
import ProgressBar from "./ProgressBar";

const TypingBox = ({ duration = 30 }) => {
  const [sentence, setSentence] = useState("");
  const [loading, setLoading] = useState(true);
  const [visibleLines, setVisibleLines] = useState({ start: 0, end: 3 }); // Track visible lines
  const [sentenceLines, setSentenceLines] = useState([]); // Store sentence split into lines
  const navigate = useRef(null);
  const nav = useNavigate();
  navigate.current = nav;
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

  // Split sentence into lines (approximately 60 characters per line)
  const splitIntoLines = (text) => {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    words.forEach((word, index) => {
      const testLine = currentLine + (currentLine ? ' ' : '') + word;

      if (testLine.length <= 60) {
        currentLine = testLine;
      } else {
        if (currentLine) {
          lines.push(currentLine);
        }
        currentLine = word;
      }
    });

    if (currentLine) {
      lines.push(currentLine);
    }

    return lines;
  };

  // Fetch sentence on mount or reload
  const loadSentence = async () => {
    setLoading(true);
    // Ensure enough content for selected duration.
    // Target ~5 chars per word, WPM up to 120 -> for safety wordsNeeded = ceil(duration * 2.5)
    const wordsNeeded = Math.ceil(duration * 2.5);
    const s = await getRandomSentence(wordsNeeded);
    // Convert first letter to lowercase
    const sentenceWithLowercaseFirst = s.charAt(0).toLowerCase() + s.slice(1);
    setSentence(sentenceWithLowercaseFirst);
    const lines = splitIntoLines(sentenceWithLowercaseFirst);
    setSentenceLines(lines);
    setVisibleLines({ start: 0, end: Math.min(3, lines.length) });
    setLoading(false);
    reset();
    setTimeout(() => inputRef.current && inputRef.current.focus(), 100);
  };

  useEffect(() => {
    loadSentence();
    // eslint-disable-next-line
  }, []);

  // Reload content when duration changes to provide adequate length
  useEffect(() => {
    if (!loading) {
      setVisibleLines({ start: 0, end: 3 });
      loadSentence();
    }
    // eslint-disable-next-line
  }, [duration]);

  // Track scrolling when user completes lines
  useEffect(() => {
    if (sentenceLines.length === 0 || loading) return;

    // Calculate which line the user is currently on
    let currentLineIndex = 0;
    let charCount = 0;

    for (let i = 0; i < sentenceLines.length; i++) {
      const lineLength = sentenceLines[i].length;
      if (typed.length <= charCount + lineLength) {
        currentLineIndex = i;
        break;
      }
      charCount += lineLength + 1; // +1 for space between lines
    }

    // If user has completed the third visible line, scroll down
    if (currentLineIndex >= visibleLines.end - 1 && visibleLines.end < sentenceLines.length) {
      setVisibleLines(prev => ({
        start: prev.start + 1,
        end: Math.min(prev.end + 1, sentenceLines.length)
      }));
    }
  }, [typed, sentenceLines, visibleLines, loading]);

  // Save stats to cookies on completion
  useEffect(() => {
    if (isComplete) {
      saveStatsToCookies({ wpm, accuracy, errors, raw: typed, sentence, date: new Date(), duration });
      // Auto-navigate to Progress page with latest stats
      setTimeout(() => navigate.current && navigate.current('/progress'), 300);
    }
    // eslint-disable-next-line
  }, [isComplete]);

  // Render sentence with highlighting for visible lines only
  const renderSentence = () => {
    if (sentenceLines.length === 0) return null;

    // Get the visible lines
    const visibleLinesArray = sentenceLines.slice(visibleLines.start, visibleLines.end);

    return (
      <div className="text-lg font-mono text-center mb-4 min-h-[4.5rem] flex flex-col justify-center">
        {visibleLinesArray.map((line, lineIdx) => {
          // Calculate the starting character index for this line
          let lineStartIndex = 0;
          for (let i = 0; i < visibleLines.start + lineIdx; i++) {
            lineStartIndex += sentenceLines[i].length;
            if (i < sentenceLines.length - 1) {
              lineStartIndex += 1; // Add space between lines
            }
          }

          return (
            <div key={visibleLines.start + lineIdx} className="mb-1">
              {line.split("").map((char, charIdx) => {
                const globalIdx = lineStartIndex + charIdx;
                let className = "";

                if (globalIdx < typed.length) {
                  className =
                    typed[globalIdx] === char
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-500 dark:text-red-400 underline";
                } else if (globalIdx === typed.length && !isComplete) {
                  className = "bg-blue-200 dark:bg-blue-700 animate-pulse"; // cursor
                }

                return (
                  <span key={globalIdx} className={className}>
                    {char}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full p-6 bg-white dark:bg-gray-800 rounded shadow">
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

      <div className="mb-6 relative">
        {/* Show indicator if there are lines above */}
        {visibleLines.start > 0 && (
          <div className="text-center text-gray-400 dark:text-gray-500 text-sm mb-2">
            ↑ {visibleLines.start} line{visibleLines.start > 1 ? 's' : ''} above
          </div>
        )}

        {loading ? (
          <div className="text-center text-gray-600 dark:text-gray-400">Loading...</div>
        ) : (
          renderSentence()
        )}

        {/* Show indicator if there are lines below */}
        {visibleLines.end < sentenceLines.length && (
          <div className="text-center text-gray-400 dark:text-gray-500 text-sm mt-2">
            ↓ {sentenceLines.length - visibleLines.end} line{sentenceLines.length - visibleLines.end > 1 ? 's' : ''} below
          </div>
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
              setVisibleLines({ start: 0, end: 3 });
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
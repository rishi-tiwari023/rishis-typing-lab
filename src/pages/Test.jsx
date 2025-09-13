import React, { useState } from 'react';
import TypingBox from '../components/TypingBox';

function Test() {
  const [duration, setDuration] = useState(30);

  return (
    <div className="relative min-h-full">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4 py-8 max-w-4xl relative">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-3 dark:text-white">Typing Test</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Test your typing speed and accuracy with our interactive typing test
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 transform hover:scale-102 transition-all duration-200 border border-gray-100 dark:border-gray-700 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="inline-block p-3 mr-4 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold dark:text-white">Start Typing</h2>
            </div>

            {/* Duration selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Duration:</span>
              {[15, 30, 60, 120].map((d) => (
                <button
                  key={d}
                  className={`px-3 py-1 rounded text-sm border transition-colors ${duration === d
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-transparent text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  onClick={() => setDuration(d)}
                >
                  {d}s
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <TypingBox duration={duration} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Test; 
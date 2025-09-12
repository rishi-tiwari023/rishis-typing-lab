import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar({ isDarkMode, toggleDarkMode, handleClearStats }) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className={`w-full py-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md border-t border-gray-200 dark:border-gray-700`}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between">
          {/* Page Title - Left */}
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white ml-0">
            Rishi's Typing Lab
          </h1>

          {/* Navigation Links - Center */}
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${currentPath === '/'
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              Home
            </Link>
            <Link
              to="/test"
              className={`px-3 py-2 rounded-md text-sm font-medium ${currentPath === '/test'
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              Typing Test
            </Link>
            <Link
              to="/progress"
              className={`px-3 py-2 rounded-md text-sm font-medium ${currentPath === '/progress'
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              Progress
            </Link>
          </div>

          {/* Action Buttons - Right */}
          <div className="flex items-center space-x-4">
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
              {isDarkMode ? '🌞' : '🌙'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 
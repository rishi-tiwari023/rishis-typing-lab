import React, { useMemo } from 'react';
import StatsChart from '../components/StatsChart';
import { getStatsFromCookies } from '../utils/saveStatsToCookies';

function Progress() {
  // Latest result summary from cookies
  const latest = useMemo(() => {
    const stats = getStatsFromCookies();
    if (!stats || stats.length === 0) return null;
    return stats[0];
  }, []);

  return (
    <div className="relative min-h-full">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-50 to-pink-100 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900 opacity-50 pointer-events-none" />

      <div className="container mx-auto px-4 py-8 max-w-4xl relative">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-3 dark:text-white">Typing Progress</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Track your improvement over time with detailed statistics and charts
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 transform hover:scale-102 transition-all duration-200 border border-gray-100 dark:border-gray-700 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
          {/* Performance Overview Header */}
          <div className="flex items-center mb-6">
            <div className="inline-block p-3 mr-4 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold dark:text-white">Performance Overview</h2>
          </div>

          {/* Summary Statistics */}
          {latest && (
            <div className="grid grid-cols-3 gap-3 lg:gap-6 mb-6 text-center">
              <div className="p-3 lg:p-6 rounded-lg bg-gray-50 dark:bg-gray-900">
                <div className="text-gray-600 dark:text-gray-300 text-xs lg:text-sm mb-1 lg:mb-2">WPM</div>
                <div className="text-2xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400">{latest.wpm}</div>
              </div>
              <div className="p-3 lg:p-6 rounded-lg bg-gray-50 dark:bg-gray-900">
                <div className="text-gray-600 dark:text-gray-300 text-xs lg:text-sm mb-1 lg:mb-2">Accuracy</div>
                <div className="text-2xl lg:text-4xl font-bold text-green-600 dark:text-green-400">{latest.accuracy}%</div>
              </div>
              <div className="p-3 lg:p-6 rounded-lg bg-gray-50 dark:bg-gray-900">
                <div className="text-gray-600 dark:text-gray-300 text-xs lg:text-sm mb-1 lg:mb-2">Errors</div>
                <div className="text-2xl lg:text-4xl font-bold text-red-500">{latest.errors ?? 0}</div>
              </div>
            </div>
          )}

          {/* Chart Section */}
          <div className="h-96">
            <StatsChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Progress; 
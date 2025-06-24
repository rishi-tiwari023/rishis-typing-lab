import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="relative min-h-full">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 opacity-10 pointer-events-none" />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl relative">
        <div className="text-center mb-8">
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Improve your typing speed and accuracy with our interactive typing test platform
          </p>
          <Link
            to="/test"
            className="inline-block px-8 py-4 text-lg font-medium text-white rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Start Typing Test
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-200 border border-gray-100 dark:border-gray-700 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
            <div className="inline-block p-3 mb-4 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">Features</h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="flex items-center">
                <span className="mr-2">•</span>
                Real-time WPM calculation
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                Accuracy tracking
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                Progress visualization
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                Dark mode support
              </li>
              <li className="flex items-center">
                <span className="mr-2">•</span>
                Responsive design
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-200 border border-gray-100 dark:border-gray-700 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
            <div className="inline-block p-3 mb-4 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">How to Use</h2>
            <ol className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="flex items-center">
                <span className="mr-2 font-medium">1.</span>
                Click on "Start Typing Test"
              </li>
              <li className="flex items-center">
                <span className="mr-2 font-medium">2.</span>
                Type the displayed text accurately
              </li>
              <li className="flex items-center">
                <span className="mr-2 font-medium">3.</span>
                View your WPM and accuracy in real-time
              </li>
              <li className="flex items-center">
                <span className="mr-2 font-medium">4.</span>
                Check your progress in the Progress section
              </li>
              <li className="flex items-center">
                <span className="mr-2 font-medium">5.</span>
                Practice regularly to improve!
              </li>
            </ol>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/progress"
            className="inline-flex items-center text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium group"
          >
            View Your Progress
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home; 
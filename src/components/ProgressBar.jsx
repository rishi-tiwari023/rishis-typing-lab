import React from 'react';

const ProgressBar = ({ typed, sentence, wpm, accuracy, isComplete }) => {
  // Calculate progress percentage
  const progress = Math.min(100, Math.round((typed.length / sentence.length) * 100));

  // Determine color based on progress
  const getProgressColor = () => {
    if (isComplete) return 'bg-green-500';
    if (progress > 75) return 'bg-blue-500';
    if (progress > 50) return 'bg-yellow-500';
    if (progress > 25) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="w-full mb-4">
      {/* Progress stats */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-4">
          <div className="text-lg">
            <span className="font-semibold text-gray-700 dark:text-gray-300">WPM: </span>
            <span className="font-bold text-blue-600 dark:text-blue-400">{wpm}</span>
          </div>
        </div>
        <div className="text-lg">
          <span className="font-semibold text-gray-700 dark:text-gray-300">Progress: </span>
          <span className="font-bold text-purple-600 dark:text-purple-400">{progress}%</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${getProgressColor()}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Completion message */}
      {isComplete && (
        <div className="text-center mt-2 text-green-600 dark:text-green-400 font-semibold animate-bounce">
          Test Complete! 🎉
        </div>
      )}
    </div>
  );
};

export default ProgressBar; 
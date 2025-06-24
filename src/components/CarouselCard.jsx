import React from 'react';

function CarouselCard({ title, items, className = '' }) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-full transform hover:scale-102 transition-all duration-200 border border-gray-100 dark:border-gray-700 ${className}`}>
      <h3 className="text-xl font-semibold mb-4 dark:text-white bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 inline-block text-transparent bg-clip-text">{title}</h3>
      <ul className="space-y-3 text-gray-600 dark:text-gray-300">
        {items.map((item, index) => (
          <li key={index} className="flex items-center group">
            <span className="mr-3 h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 group-hover:scale-125 transition-transform"></span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CarouselCard; 
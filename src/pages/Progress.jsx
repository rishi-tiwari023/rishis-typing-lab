import React from 'react';
import Slider from 'react-slick';
import StatsChart from '../components/StatsChart';
import CarouselCard from '../components/CarouselCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Progress() {
  const tips = [
    {
      title: "Tips for Improvement",
      items: [
        "Practice regularly, ideally daily",
        "Focus on accuracy before speed",
        "Take breaks to avoid fatigue",
        "Use proper finger positioning",
        "Challenge yourself with longer texts"
      ]
    },
    {
      title: "Advanced Tips",
      items: [
        "Learn touch typing techniques",
        "Practice with varied content",
        "Set daily typing goals",
        "Monitor your progress regularly",
        "Join typing communities"
      ]
    },
    {
      title: "Expert Tips",
      items: [
        "Master keyboard shortcuts",
        "Practice with code snippets",
        "Type without looking at keyboard",
        "Focus on problem areas",
        "Use typing games for variety"
      ]
    }
  ];

  const achievements = [
    {
      title: "Beginner Goals",
      items: [
        "Reach 40 WPM with 95% accuracy",
        "Maintain 60 WPM for 5 minutes",
        "Complete a test with 100% accuracy",
        "Practice for 7 days straight",
        "Master home row keys"
      ]
    },
    {
      title: "Intermediate Goals",
      items: [
        "Achieve 80 WPM milestone",
        "Maintain 95% accuracy at high speed",
        "Complete advanced typing tests",
        "Practice for 30 days straight",
        "Master number row typing"
      ]
    },
    {
      title: "Expert Goals",
      items: [
        "Reach 100+ WPM consistently",
        "Master special characters",
        "Zero errors in long texts",
        "Type without looking down",
        "Teach others typing skills"
      ]
    }
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: true,
    adaptiveHeight: true,
    className: "h-full"
  };

  return (
    <div className="relative">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 opacity-10 pointer-events-none" />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl relative">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4 dark:text-white">Your Typing Progress</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Track your improvement over time with detailed statistics and charts
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8 transform hover:scale-102 transition-all duration-200 border border-gray-100 dark:border-gray-700 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
          <div className="flex items-center mb-6">
            <div className="inline-block p-3 mr-4 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold dark:text-white">Performance Overview</h2>
          </div>
          <StatsChart />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="h-[400px] bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 transform hover:scale-102 transition-all duration-200 border border-gray-100 dark:border-gray-700 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
            <div className="flex items-center mb-4">
              <div className="inline-block p-3 mr-4 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold dark:text-white">Typing Tips</h3>
            </div>
            <Slider {...sliderSettings}>
              {tips.map((tip, index) => (
                <div key={index} className="h-full pb-12">
                  <CarouselCard title={tip.title} items={tip.items} />
                </div>
              ))}
            </Slider>
          </div>

          <div className="h-[400px] bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 transform hover:scale-102 transition-all duration-200 border border-gray-100 dark:border-gray-700 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
            <div className="flex items-center mb-4">
              <div className="inline-block p-3 mr-4 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold dark:text-white">Achievement Goals</h3>
            </div>
            <Slider {...sliderSettings}>
              {achievements.map((achievement, index) => (
                <div key={index} className="h-full pb-12">
                  <CarouselCard title={achievement.title} items={achievement.items} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Progress; 
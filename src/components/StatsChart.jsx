import React, { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { getStatsFromCookies } from '../utils/saveStatsToCookies';

const StatsChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredData, setHoveredData] = useState(null);

  // Calculate statistics
  const stats = useMemo(() => {
    if (chartData.length === 0) return null;

    const wpmValues = chartData.map(d => d.wpm);
    const accuracyValues = chartData.map(d => d.accuracy);

    const avgWpm = wpmValues.reduce((a, b) => a + b, 0) / wpmValues.length;
    const avgAccuracy = accuracyValues.reduce((a, b) => a + b, 0) / accuracyValues.length;

    return {
      avgWpm: Number(avgWpm.toFixed(1)),
      maxWpm: Math.max(...wpmValues),
      avgAccuracy: Number(avgAccuracy.toFixed(1)),
      improvement: wpmValues.length > 1 ?
        Number(((wpmValues[0] - wpmValues[wpmValues.length - 1]) / wpmValues[wpmValues.length - 1] * 100).toFixed(1)) : 0
    };
  }, [chartData]);

  const loadStats = () => {
    try {
      const stats = getStatsFromCookies();
      // Stats are already in reverse chronological order (newest first)
      // Take the first 10 entries and map them for display
      const transformedData = stats
        .slice(0, 10)  // Take first 10 (most recent) attempts
        .map((stat, index) => ({
          attempt: `#${stats.length - index}`,  // Number from total attempts
          wpm: Number(stat.wpm.toFixed(1)),
          accuracy: Number(stat.accuracy.toFixed(1)),
          date: new Date(stat.date).toLocaleTimeString()
        }));
      setChartData(transformedData);
    } catch (err) {
      setError('Failed to load statistics');
      console.error('Error loading stats:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadStats();
  }, []);

  // Set up cookie change listener
  useEffect(() => {
    const checkForUpdates = () => {
      loadStats();
    };

    // Check for updates every second
    const interval = setInterval(checkForUpdates, 1000);

    return () => clearInterval(interval);
  }, []);

  // Custom tooltip with enhanced styling
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">Attempt {label} • {data.date}</p>
          <div className="space-y-1">
            {payload.map((entry, index) => (
              <p key={index} className="text-sm font-medium flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.stroke }} />
                <span className="text-gray-600 dark:text-gray-300">{entry.name}:</span>
                <span style={{ color: entry.stroke }}>{entry.value.toFixed(1)}{entry.name === "Accuracy %" ? "%" : ""}</span>
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom legend with enhanced styling
  const CustomLegend = ({ payload }) => {
    if (!payload) return null;
    return (
      <div className="flex justify-center gap-6 pt-4">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Your Progress</h2>
        {stats && (
          <div className="flex flex-wrap gap-2 lg:gap-4 text-xs lg:text-sm">
            <div className={`px-2 lg:px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 transition-all duration-200 ${hoveredData ? 'opacity-50' : ''
              }`}>
              <span className="text-gray-600 dark:text-gray-300">Avg WPM: </span>
              <span className="text-purple-600 dark:text-purple-400 font-semibold">{stats.avgWpm}</span>
            </div>
            <div className={`px-2 lg:px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 transition-all duration-200 ${hoveredData ? 'opacity-50' : ''
              }`}>
              <span className="text-gray-600 dark:text-gray-300">Max WPM: </span>
              <span className="text-purple-600 dark:text-purple-400 font-semibold">{stats.maxWpm}</span>
            </div>
            <div className={`px-2 lg:px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 transition-all duration-200 ${hoveredData ? 'opacity-50' : ''
              }`}>
              <span className="text-gray-600 dark:text-gray-300">Avg Accuracy: </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{stats.avgAccuracy}%</span>
            </div>
            {stats.improvement !== 0 && (
              <div className={`px-2 lg:px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 transition-all duration-200 ${hoveredData ? 'opacity-50' : ''
                }`}>
                <span className="text-gray-600 dark:text-gray-300">Progress: </span>
                <span className={stats.improvement > 0 ?
                  "text-green-600 dark:text-green-400 font-semibold" :
                  "text-red-600 dark:text-red-400 font-semibold"
                }>
                  {stats.improvement > 0 ? '+' : ''}{stats.improvement}%
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Show current hovered stats */}
      {hoveredData && (
        <div className="absolute top-6 right-6 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-200">
          <div className="flex flex-col gap-2">
            <p className="text-gray-700 dark:text-gray-300 font-medium">Current Selection</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              <span className="text-gray-600 dark:text-gray-300">WPM:</span>
              <span className="text-purple-600 dark:text-purple-400 font-semibold">{hoveredData.wpm}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-gray-600 dark:text-gray-300">Accuracy:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{hoveredData.accuracy}%</span>
            </div>
            <p className="text-gray-500 dark:text-gray-500 text-sm">{hoveredData.date}</p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-gray-600 dark:text-gray-400">Loading statistics...</div>
        </div>
      ) : error ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      ) : chartData.length > 0 ? (
        <div className="flex-1 relative min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              onMouseMove={(data) => {
                if (data.activePayload) {
                  setHoveredData(data.activePayload[0].payload);
                }
              }}
              onMouseLeave={() => setHoveredData(null)}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(107, 114, 128, 0.2)"
                vertical={false}
              />
              <XAxis
                dataKey="attempt"
                stroke="#6b7280"
                tick={{ fill: '#6b7280' }}
                axisLine={{ stroke: '#d1d5db' }}
                tickLine={{ stroke: '#d1d5db' }}
                className="dark:text-gray-400"
              />
              <YAxis
                yAxisId="left"
                stroke="#6b7280"
                tick={{ fill: '#6b7280' }}
                axisLine={{ stroke: '#d1d5db' }}
                tickLine={{ stroke: '#d1d5db' }}
                domain={[0, dataMax => Math.max(150, Math.ceil(dataMax / 50) * 50)]}
                tickFormatter={value => value.toFixed(1)}
                label={{
                  value: 'Words per Minute',
                  angle: -90,
                  position: 'insideLeft',
                  style: { fill: '#6b7280', fontSize: 14 },
                  offset: 0
                }}
                className="dark:text-gray-400"
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#6b7280"
                tick={{ fill: '#6b7280' }}
                axisLine={{ stroke: '#d1d5db' }}
                tickLine={{ stroke: '#d1d5db' }}
                domain={[0, 100]}
                tickFormatter={value => value.toFixed(1)}
                label={{
                  value: 'Accuracy %',
                  angle: 90,
                  position: 'insideRight',
                  style: { fill: '#6b7280', fontSize: 14 },
                  offset: 0
                }}
                className="dark:text-gray-400"
              />
              {stats && (
                <ReferenceLine
                  y={stats.avgWpm}
                  yAxisId="left"
                  stroke="#8b5cf6"
                  strokeDasharray="3 3"
                  label={{
                    value: 'Avg WPM',
                    position: 'insideTopLeft',
                    fill: '#8b5cf6'
                  }}
                />
              )}
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ stroke: 'rgba(107, 114, 128, 0.2)' }}
              />
              <Legend content={<CustomLegend />} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="wpm"
                name="WPM"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{
                  stroke: '#8b5cf6',
                  strokeWidth: 2,
                  r: 4,
                  fill: '#ffffff',
                  className: 'dark:fill-gray-900'
                }}
                activeDot={{
                  r: 8,
                  stroke: '#8b5cf6',
                  strokeWidth: 2,
                  fill: '#ffffff',
                  className: 'dark:fill-gray-900'
                }}
                animationDuration={1000}
                animationEasing="ease-in-out"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="accuracy"
                name="Accuracy %"
                stroke="#10b981"
                strokeWidth={3}
                dot={{
                  stroke: '#10b981',
                  strokeWidth: 2,
                  r: 4,
                  fill: '#ffffff',
                  className: 'dark:fill-gray-900'
                }}
                activeDot={{
                  r: 8,
                  stroke: '#10b981',
                  strokeWidth: 2,
                  fill: '#ffffff',
                  className: 'dark:fill-gray-900'
                }}
                animationDuration={1000}
                animationEasing="ease-in-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-2">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No progress data yet
          </p>
          <p className="text-gray-500 text-sm">
            Complete some typing tests to see your progress!
          </p>
        </div>
      )}
    </div>
  );
};

export default StatsChart;
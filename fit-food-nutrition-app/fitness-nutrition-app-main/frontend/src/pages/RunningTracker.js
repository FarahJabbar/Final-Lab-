import React, { useState, useEffect, useContext } from 'react';
import { FaRunning, FaMapMarkerAlt, FaClock, FaTachometerAlt, FaFire } from 'react-icons/fa';
import { AuthContext } from '../App';

const RunningTracker = () => {
  const { userData, setUserData } = useContext(AuthContext);
  const [isRunning, setIsRunning] = useState(false);
  const [stats, setStats] = useState({
    weeklyDistance: 0,
    monthlyDistance: 0,
    totalRuns: 0,
    averagePace: '0:00'
  });

  const [recentRuns, setRecentRuns] = useState([]);
  const [currentRun, setCurrentRun] = useState({
    distance: 0,
    duration: 0,
    pace: '0:00',
    calories: 0
  });

  useEffect(() => {
    // Load running data from localStorage
    const savedRuns = JSON.parse(localStorage.getItem('runningHistory') || '[]');
    const savedStats = JSON.parse(localStorage.getItem('runningStats') || JSON.stringify(stats));
    
    setRecentRuns(savedRuns);
    setStats(savedStats);
  }, []);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setCurrentRun(prev => {
          const newDistance = prev.distance + 0.01;
          const newDuration = prev.duration + 1;
          const newPace = calculatePace(newDistance, newDuration);
          const newCalories = Math.round(newDistance * 60);
          
          return {
            distance: parseFloat(newDistance.toFixed(2)),
            duration: newDuration,
            pace: newPace,
            calories: newCalories
          };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const calculatePace = (distance, duration) => {
    if (distance === 0) return '0:00';
    const paceInSeconds = duration / distance;
    const minutes = Math.floor(paceInSeconds / 60);
    const seconds = Math.floor(paceInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStartRun = () => {
    setIsRunning(true);
    setCurrentRun({
      distance: 0,
      duration: 0,
      pace: '0:00',
      calories: 0
    });
  };

  const handleStopRun = () => {
    setIsRunning(false);
    const newRun = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      distance: currentRun.distance,
      duration: formatDuration(currentRun.duration),
      pace: currentRun.pace,
      calories: currentRun.calories,
      route: 'New Route'
    };

    const updatedRuns = [newRun, ...recentRuns];
    setRecentRuns(updatedRuns);

    // Calculate new stats
    const today = new Date();
    const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

    const weeklyDistance = updatedRuns
      .filter(run => new Date(run.date) >= weekStart)
      .reduce((sum, run) => sum + run.distance, 0);

    const monthlyDistance = updatedRuns
      .filter(run => new Date(run.date) >= monthStart)
      .reduce((sum, run) => sum + run.distance, 0);

    const updatedStats = {
      weeklyDistance: parseFloat(weeklyDistance.toFixed(1)),
      monthlyDistance: parseFloat(monthlyDistance.toFixed(1)),
      totalRuns: updatedRuns.length,
      averagePace: calculateAveragePace(updatedRuns)
    };

    setStats(updatedStats);

    // Save to localStorage
    localStorage.setItem('runningHistory', JSON.stringify(updatedRuns));
    localStorage.setItem('runningStats', JSON.stringify(updatedStats));

    // Update userData context
    setUserData(prevData => ({
      ...prevData,
      runningHistory: updatedRuns,
      runningStats: updatedStats
    }));
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const calculateAveragePace = (runs) => {
    if (runs.length === 0) return '0:00';
    const totalPace = runs.reduce((acc, run) => {
      const [min, sec] = run.pace.split(':').map(Number);
      return acc + (min * 60 + sec);
    }, 0);
    const avgPace = totalPace / runs.length;
    const minutes = Math.floor(avgPace / 60);
    const seconds = Math.floor(avgPace % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Running Tracker</h1>

      {/* Start Run Button */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md p-6 mb-8 text-center">
        {!isRunning ? (
          <button 
            onClick={handleStartRun}
            className="w-full py-4 text-white text-lg font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center"
          >
            <FaRunning className="mr-2 text-2xl" />
            Start Run
          </button>
        ) : (
          <div className="text-white">
            <div className="text-2xl font-bold mb-2">Current Run</div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm">Distance</div>
                <div className="text-xl">{currentRun.distance.toFixed(2)} km</div>
              </div>
              <div>
                <div className="text-sm">Duration</div>
                <div className="text-xl">{formatDuration(currentRun.duration)}</div>
              </div>
              <div>
                <div className="text-sm">Pace</div>
                <div className="text-xl">{currentRun.pace} /km</div>
              </div>
              <div>
                <div className="text-sm">Calories</div>
                <div className="text-xl">{currentRun.calories}</div>
              </div>
            </div>
            <button 
              onClick={handleStopRun}
              className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
            >
              Stop Run
            </button>
          </div>
        )}
      </div>

      {/* Running Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500">Weekly Distance</h3>
            <FaMapMarkerAlt className="text-blue-500" />
          </div>
          <p className="text-2xl font-bold">{stats.weeklyDistance} km</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500">Monthly Distance</h3>
            <FaMapMarkerAlt className="text-purple-500" />
          </div>
          <p className="text-2xl font-bold">{stats.monthlyDistance} km</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500">Total Runs</h3>
            <FaRunning className="text-green-500" />
          </div>
          <p className="text-2xl font-bold">{stats.totalRuns}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-500">Average Pace</h3>
            <FaTachometerAlt className="text-red-500" />
          </div>
          <p className="text-2xl font-bold">{stats.averagePace} /km</p>
        </div>
      </div>

      {/* Recent Runs */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Runs</h2>
        <div className="space-y-4">
          {recentRuns.map(run => (
            <div key={run.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-semibold">{run.route}</h3>
                <div className="text-sm text-gray-500">{run.date}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold">{run.distance} km</div>
                <div className="text-sm text-gray-500">
                  {run.duration} • {run.pace} /km
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RunningTracker; 
import React, { useState, useEffect, useContext } from 'react';
import { FaWeight, FaBullseye, FaChartLine, FaAppleAlt, FaDumbbell, FaBed, FaTint } from 'react-icons/fa';
import { AuthContext } from '../App';

const WeightManagement = () => {
  const { userData, setUserData } = useContext(AuthContext);
  const [weightHistory, setWeightHistory] = useState([]);
  const [goals, setGoals] = useState({
    currentWeight: 75.5,
    targetWeight: 70.0,
    weeklyGoal: -0.5,
    remainingWeight: 5.5,
    estimatedWeeks: 11
  });

  const [newWeight, setNewWeight] = useState('');

  useEffect(() => {
    // Load weight history from localStorage
    const savedWeightHistory = JSON.parse(localStorage.getItem('weightHistory') || '[]');
    setWeightHistory(savedWeightHistory);
    
    // Load goals from localStorage
    const savedGoals = JSON.parse(localStorage.getItem('weightGoals') || JSON.stringify(goals));
    setGoals(savedGoals);
  }, []);

  const handleAddWeight = () => {
    if (!newWeight) return;
    
    const weight = parseFloat(newWeight);
    const lastWeight = weightHistory[0]?.weight || goals.currentWeight;
    const change = parseFloat((weight - lastWeight).toFixed(1));

    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      weight: weight,
      change: change
    };

    const updatedHistory = [newEntry, ...weightHistory];
    setWeightHistory(updatedHistory);
    
    const updatedGoals = {
      ...goals,
      currentWeight: weight,
      remainingWeight: parseFloat((goals.targetWeight - weight).toFixed(1)),
      estimatedWeeks: Math.ceil(Math.abs(goals.targetWeight - weight) / Math.abs(goals.weeklyGoal))
    };
    setGoals(updatedGoals);
    
    // Save to localStorage
    localStorage.setItem('weightHistory', JSON.stringify(updatedHistory));
    localStorage.setItem('weightGoals', JSON.stringify(updatedGoals));
    
    // Update userData context
    setUserData(prevData => ({
      ...prevData,
      weightHistory: updatedHistory,
      weightGoals: updatedGoals
    }));
    
    setNewWeight('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Weight Management</h1>

      {/* Current Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Current Status</h2>
            <FaWeight className="text-2xl text-blue-500" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="text-gray-500">Current Weight</div>
              <div className="text-2xl font-bold">{goals.currentWeight} kg</div>
            </div>
            <div>
              <div className="text-gray-500">Target Weight</div>
              <div className="text-2xl font-bold">{goals.targetWeight} kg</div>
            </div>
            <div>
              <div className="text-gray-500">Weekly Goal</div>
              <div className="text-2xl font-bold">{goals.weeklyGoal} kg/week</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Progress</h2>
            <FaBullseye className="text-2xl text-purple-500" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="text-gray-500">Remaining Weight</div>
              <div className="text-2xl font-bold">{goals.remainingWeight} kg</div>
            </div>
            <div>
              <div className="text-gray-500">Estimated Time</div>
              <div className="text-2xl font-bold">{goals.estimatedWeeks} weeks</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-500 h-2.5 rounded-full" 
                style={{ 
                  width: `${((goals.currentWeight - goals.targetWeight) / (goals.currentWeight - goals.targetWeight)) * 100}%` 
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Weight Entry */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Add Weight Entry</h2>
          <FaChartLine className="text-2xl text-green-500" />
        </div>
        <div className="flex gap-4">
          <input
            type="number"
            value={newWeight}
            onChange={(e) => setNewWeight(e.target.value)}
            placeholder="Enter weight in kg"
            className="flex-1 p-2 border rounded-lg"
            step="0.1"
          />
          <button
            onClick={handleAddWeight}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Entry
          </button>
        </div>
      </div>

      {/* Weight History */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Weight History</h2>
        <div className="space-y-4">
          {weightHistory.map(entry => (
            <div key={entry.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-semibold">{entry.weight} kg</div>
                <div className="text-sm text-gray-500">{entry.date}</div>
              </div>
              <div className={`font-semibold ${entry.change > 0 ? 'text-red-500' : 'text-green-500'}`}>
                {entry.change > 0 ? '+' : ''}{entry.change} kg
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Healthy Eating</h2>
            <FaAppleAlt className="text-2xl text-red-500" />
          </div>
          <ul className="space-y-2 text-gray-600">
            <li>• Eat protein-rich foods</li>
            <li>• Stay hydrated</li>
            <li>• Control portion sizes</li>
            <li>• Limit processed foods</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Exercise</h2>
            <FaDumbbell className="text-2xl text-blue-500" />
          </div>
          <ul className="space-y-2 text-gray-600">
            <li>• Strength training 3x/week</li>
            <li>• Cardio 4-5x/week</li>
            <li>• Stay active daily</li>
            <li>• Mix up your routine</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recovery</h2>
            <FaBed className="text-2xl text-purple-500" />
          </div>
          <ul className="space-y-2 text-gray-600">
            <li>• Get 7-8 hours sleep</li>
            <li>• Stay hydrated</li>
            <li>• Take rest days</li>
            <li>• Manage stress</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WeightManagement; 
import React, { useState, useEffect, useContext } from 'react';
import { FaDumbbell, FaClock, FaCalendarAlt, FaPlus, FaTrash } from 'react-icons/fa';
import { AuthContext } from '../App';

const WorkoutScheduler = () => {
  const { userData, setUserData } = useContext(AuthContext);
  const [workouts, setWorkouts] = useState([]);
  const [upcomingWorkouts, setUpcomingWorkouts] = useState([]);
  const [newWorkout, setNewWorkout] = useState({
    title: '',
    date: '',
    time: '',
    duration: '',
    completed: false
  });

  useEffect(() => {
    // Load workouts from localStorage
    const savedWorkouts = JSON.parse(localStorage.getItem('scheduledWorkouts') || '[]');
    const today = new Date().toISOString().split('T')[0];
    
    // Separate today's and upcoming workouts
    const todayWorkouts = savedWorkouts.filter(w => w.date === today);
    const futureWorkouts = savedWorkouts.filter(w => w.date > today);
    
    setWorkouts(todayWorkouts);
    setUpcomingWorkouts(futureWorkouts);
  }, []);

  const handleAddWorkout = () => {
    if (!newWorkout.title || !newWorkout.date || !newWorkout.time || !newWorkout.duration) {
      alert('Please fill in all fields');
      return;
    }

    const workout = {
      id: Date.now(),
      ...newWorkout
    };

    const today = new Date().toISOString().split('T')[0];
    const updatedWorkouts = [...workouts, ...upcomingWorkouts];
    
    if (workout.date === today) {
      setWorkouts([...workouts, workout]);
    } else {
      setUpcomingWorkouts([...upcomingWorkouts, workout]);
    }

    // Save to localStorage
    const allWorkouts = [...updatedWorkouts, workout];
    localStorage.setItem('scheduledWorkouts', JSON.stringify(allWorkouts));
    
    // Update userData context
    setUserData(prevData => ({
      ...prevData,
      scheduledWorkouts: allWorkouts
    }));

    // Reset form
    setNewWorkout({
      title: '',
      date: '',
      time: '',
      duration: '',
      completed: false
    });
  };

  const handleCompleteWorkout = (workoutId) => {
    const updatedWorkouts = workouts.map(workout => {
      if (workout.id === workoutId) {
        return { ...workout, completed: !workout.completed };
      }
      return workout;
    });

    setWorkouts(updatedWorkouts);
    
    // Update localStorage
    const allWorkouts = [...updatedWorkouts, ...upcomingWorkouts];
    localStorage.setItem('scheduledWorkouts', JSON.stringify(allWorkouts));
    
    // Update userData context
    setUserData(prevData => ({
      ...prevData,
      scheduledWorkouts: allWorkouts
    }));
  };

  const handleDeleteWorkout = (workoutId) => {
    const updatedWorkouts = workouts.filter(w => w.id !== workoutId);
    const updatedUpcoming = upcomingWorkouts.filter(w => w.id !== workoutId);
    
    setWorkouts(updatedWorkouts);
    setUpcomingWorkouts(updatedUpcoming);
    
    // Update localStorage
    const allWorkouts = [...updatedWorkouts, ...updatedUpcoming];
    localStorage.setItem('scheduledWorkouts', JSON.stringify(allWorkouts));
    
    // Update userData context
    setUserData(prevData => ({
      ...prevData,
      scheduledWorkouts: allWorkouts
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Workout Scheduler</h1>

      {/* Add Workout Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Schedule New Workout</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Workout Title"
            value={newWorkout.title}
            onChange={(e) => setNewWorkout({...newWorkout, title: e.target.value})}
            className="p-2 border rounded"
          />
          <input
            type="date"
            value={newWorkout.date}
            onChange={(e) => setNewWorkout({...newWorkout, date: e.target.value})}
            className="p-2 border rounded"
          />
          <input
            type="time"
            value={newWorkout.time}
            onChange={(e) => setNewWorkout({...newWorkout, time: e.target.value})}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Duration (e.g., 45 min)"
            value={newWorkout.duration}
            onChange={(e) => setNewWorkout({...newWorkout, duration: e.target.value})}
            className="p-2 border rounded"
          />
        </div>
        <button
          onClick={handleAddWorkout}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add Workout
        </button>
      </div>

      {/* Today's Workouts */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Today's Workouts</h2>
        <div className="space-y-4">
          {workouts.map(workout => (
            <div key={workout.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <FaDumbbell className="text-blue-500 mr-3" />
                <div>
                  <h3 className="font-semibold">{workout.title}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <FaClock className="mr-1" />
                    {workout.time} • {workout.duration}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleCompleteWorkout(workout.id)}
                  className={`px-4 py-2 rounded ${
                    workout.completed
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {workout.completed ? 'Completed' : 'Mark Complete'}
                </button>
                <button
                  onClick={() => handleDeleteWorkout(workout.id)}
                  className="p-2 text-red-500 hover:text-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Workouts */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Upcoming Workouts</h2>
        <div className="space-y-4">
          {upcomingWorkouts.map(workout => (
            <div key={workout.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <FaDumbbell className="text-2xl text-purple-500" />
                <div>
                  <h3 className="font-semibold">{workout.title}</h3>
                  <div className="flex items-center text-gray-500 text-sm">
                    <FaCalendarAlt className="mr-1" />
                    <span>{workout.date} • {workout.time} • {workout.duration}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleDeleteWorkout(workout.id)}
                  className="p-2 text-red-500 hover:text-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutScheduler; 
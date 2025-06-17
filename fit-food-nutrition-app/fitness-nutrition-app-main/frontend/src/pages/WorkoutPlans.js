import React, { useState } from 'react';
import { FaDumbbell, FaRunning, FaHeartbeat, FaWeight, FaFire } from 'react-icons/fa';

const WorkoutPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const workoutPlans = [
    {
      id: 'beginner',
      title: 'Beginner Fitness Plan',
      icon: <FaDumbbell className="text-blue-500 text-3xl" />,
      description: 'Perfect for those just starting their fitness journey',
      duration: '8 weeks',
      workouts: [
        {
          day: 'Day 1',
          exercises: [
            { name: 'Bodyweight Squats', sets: 3, reps: '12-15' },
            { name: 'Push-ups', sets: 3, reps: '8-10' },
            { name: 'Plank', sets: 3, reps: '30 seconds' },
            { name: 'Walking Lunges', sets: 3, reps: '10 each leg' }
          ]
        },
        {
          day: 'Day 2',
          exercises: [
            { name: 'Rest Day', sets: '-', reps: '-' }
          ]
        },
        {
          day: 'Day 3',
          exercises: [
            { name: 'Dumbbell Rows', sets: 3, reps: '10-12 each arm' },
            { name: 'Glute Bridges', sets: 3, reps: '15' },
            { name: 'Mountain Climbers', sets: 3, reps: '30 seconds' },
            { name: 'Bicycle Crunches', sets: 3, reps: '12 each side' }
          ]
        }
      ]
    },
    {
      id: 'weight-loss',
      title: 'Weight Loss Program',
      icon: <FaWeight className="text-green-500 text-3xl" />,
      description: 'High-intensity workouts to burn calories and lose weight',
      duration: '12 weeks',
      workouts: [
        {
          day: 'Day 1',
          exercises: [
            { name: 'HIIT Circuit', sets: 4, reps: '30 seconds each' },
            { name: 'Jumping Jacks', sets: 3, reps: '45 seconds' },
            { name: 'Burpees', sets: 3, reps: '10' },
            { name: 'Mountain Climbers', sets: 3, reps: '45 seconds' }
          ]
        },
        {
          day: 'Day 2',
          exercises: [
            { name: 'Rest Day', sets: '-', reps: '-' }
          ]
        },
        {
          day: 'Day 3',
          exercises: [
            { name: 'Running', sets: 1, reps: '20 minutes' },
            { name: 'Squat Jumps', sets: 3, reps: '15' },
            { name: 'Plank to Push-up', sets: 3, reps: '10' },
            { name: 'High Knees', sets: 3, reps: '45 seconds' }
          ]
        }
      ]
    },
    {
      id: 'strength',
      title: 'Strength Building',
      icon: <FaFire className="text-red-500 text-3xl" />,
      description: 'Build muscle and increase strength',
      duration: '10 weeks',
      workouts: [
        {
          day: 'Day 1',
          exercises: [
            { name: 'Bench Press', sets: 4, reps: '8-10' },
            { name: 'Squats', sets: 4, reps: '8-10' },
            { name: 'Deadlifts', sets: 4, reps: '8-10' },
            { name: 'Pull-ups', sets: 3, reps: '8-10' }
          ]
        },
        {
          day: 'Day 2',
          exercises: [
            { name: 'Rest Day', sets: '-', reps: '-' }
          ]
        },
        {
          day: 'Day 3',
          exercises: [
            { name: 'Overhead Press', sets: 4, reps: '8-10' },
            { name: 'Barbell Rows', sets: 4, reps: '8-10' },
            { name: 'Lunges', sets: 3, reps: '10 each leg' },
            { name: 'Dips', sets: 3, reps: '10-12' }
          ]
        }
      ]
    },
    {
      id: 'cardio',
      title: 'Cardio Fitness',
      icon: <FaHeartbeat className="text-purple-500 text-3xl" />,
      description: 'Improve cardiovascular health and endurance',
      duration: '8 weeks',
      workouts: [
        {
          day: 'Day 1',
          exercises: [
            { name: 'Running', sets: 1, reps: '30 minutes' },
            { name: 'Jump Rope', sets: 3, reps: '5 minutes' },
            { name: 'Cycling', sets: 1, reps: '20 minutes' },
            { name: 'Stair Climbing', sets: 3, reps: '10 minutes' }
          ]
        },
        {
          day: 'Day 2',
          exercises: [
            { name: 'Rest Day', sets: '-', reps: '-' }
          ]
        },
        {
          day: 'Day 3',
          exercises: [
            { name: 'Swimming', sets: 1, reps: '30 minutes' },
            { name: 'Elliptical', sets: 1, reps: '20 minutes' },
            { name: 'Rowing', sets: 3, reps: '10 minutes' },
            { name: 'HIIT Cardio', sets: 4, reps: '5 minutes' }
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-8">Workout Plans</h1>
        <p className="text-center text-gray-600 mb-12">Choose a plan that matches your fitness goals</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {workoutPlans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {plan.icon}
                    <h2 className="text-2xl font-bold ml-3">{plan.title}</h2>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {plan.duration}
                  </span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                <button
                  onClick={() => setSelectedPlan(selectedPlan === plan.id ? null : plan.id)}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  {selectedPlan === plan.id ? 'Hide Details' : 'View Plan'}
                </button>

                {selectedPlan === plan.id && (
                  <div className="mt-6 space-y-6">
                    {plan.workouts.map((workout, index) => (
                      <div key={index} className="border-t pt-4">
                        <h3 className="font-semibold text-lg mb-3">{workout.day}</h3>
                        <div className="space-y-3">
                          {workout.exercises.map((exercise, exIndex) => (
                            <div key={exIndex} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                              <span className="font-medium">{exercise.name}</span>
                              <span className="text-gray-600">
                                {exercise.sets} sets × {exercise.reps}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlans; 
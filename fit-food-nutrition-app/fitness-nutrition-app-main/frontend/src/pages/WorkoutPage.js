import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../App';
import { Input } from '../components/Input';
import {
  FaCalendarAlt,
  FaClock,
  FaDumbbell,
  FaListOl,
  FaTh,
  FaSpinner,
} from 'react-icons/fa';

const WorkoutPage = () => {
  const { userData, setUserData } = useContext(AuthContext);
  const [workouts, setWorkouts] = useState([]);
  const [newWorkout, setNewWorkout] = useState({
    date: new Date().toISOString().split('T')[0],
    exercises: [{ name: '', reps: '', sets: '', duration: '' }],
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    // Load workouts from local storage
    const savedWorkouts = JSON.parse(localStorage.getItem('workouts') || '[]');
    setWorkouts(savedWorkouts);
    setUserData((prevData) => ({
      ...prevData,
      workouts: savedWorkouts,
    }));
  }, [setUserData]);

  const validateInputs = () => {
    const newErrors = {};
    const today = new Date().toISOString().split('T')[0];

    if (!newWorkout.date) {
      newErrors.date = 'Date is required.';
    } else if (newWorkout.date < today) {
      newErrors.date = 'Date cannot be in the past.';
    }

    newWorkout.exercises.forEach((exercise, index) => {
      if (!exercise.name.trim()) {
        newErrors[`name_${index}`] = 'Exercise name is required.';
      }
      if (!exercise.reps || exercise.reps <= 0) {
        newErrors[`reps_${index}`] = 'Reps must be a positive number.';
      }
      if (!exercise.sets || exercise.sets <= 0) {
        newErrors[`sets_${index}`] = 'Sets must be a positive number.';
      }
      if (exercise.duration && exercise.duration < 0) {
        newErrors[`duration_${index}`] = 'Duration must be a non-negative number.';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddWorkout = async (e) => {
    e.preventDefault();
    if (validateInputs()) {
      try {
        setIsLoading(true);
        setSaveSuccess(false);
        
        const workoutData = {
          id: Date.now(),
          date: newWorkout.date,
          exercises: newWorkout.exercises.map(exercise => ({
            ...exercise,
            reps: parseInt(exercise.reps),
            sets: parseInt(exercise.sets),
            duration: exercise.duration ? parseInt(exercise.duration) : 0
          }))
        };

        // Save to local storage
        const existingWorkouts = JSON.parse(localStorage.getItem('workouts') || '[]');
        const updatedWorkouts = [...existingWorkouts, workoutData];
        localStorage.setItem('workouts', JSON.stringify(updatedWorkouts));

        // Update state
        setWorkouts(updatedWorkouts);
        setNewWorkout({
          date: new Date().toISOString().split('T')[0],
          exercises: [{ name: '', reps: '', sets: '', duration: '' }],
        });
        setErrors({});
        setUserData((prevData) => ({
          ...prevData,
          workouts: updatedWorkouts,
        }));
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } catch (error) {
        console.error('Error adding workout:', error);
        alert('Error saving workout. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const addExercise = () => {
    setNewWorkout((prevState) => ({
      ...prevState,
      exercises: [
        ...prevState.exercises,
        { name: '', reps: '', sets: '', duration: '' },
      ],
    }));
  };

  const removeExercise = (index) => {
    setNewWorkout((prevState) => ({
      ...prevState,
      exercises: prevState.exercises.filter((_, i) => i !== index),
    }));
  };

  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = [...newWorkout.exercises];
    updatedExercises[index][field] = value;
    setNewWorkout((prevState) => ({
      ...prevState,
      exercises: updatedExercises,
    }));
  };

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center mb-8'>
          <div>
            <h1 className='text-4xl font-bold text-gray-900'>Workout Tracker</h1>
            <p className='mt-2 text-gray-600'>Log and track your workouts</p>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Workout Form */}
          <div className='bg-white rounded-xl shadow-lg p-6'>
            <h2 className='text-xl font-semibold text-gray-900 mb-6'>
              Add New Workout
            </h2>
            <form onSubmit={handleAddWorkout}>
              <Input
                label='Date'
                icon={FaCalendarAlt}
                type='date'
                value={newWorkout.date}
                onChange={(e) =>
                  setNewWorkout((prevState) => ({
                    ...prevState,
                    date: e.target.value,
                  }))
                }
                error={errors.date}
              />
              {newWorkout.exercises.map((exercise, index) => (
                <div
                  key={index}
                  className='mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100'
                >
                  <div className='flex justify-between items-center mb-4'>
                    <h3 className='text-lg font-medium text-gray-900'>
                      Exercise {index + 1}
                    </h3>
                    {index > 0 && (
                      <button
                        type='button'
                        onClick={() => removeExercise(index)}
                        className='text-red-500 hover:text-red-600 transition-colors'
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <Input
                    label='Exercise Name'
                    icon={FaDumbbell}
                    type='text'
                    value={exercise.name}
                    onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}
                    error={errors[`name_${index}`]}
                  />

                  <Input
                    label='Reps'
                    icon={FaListOl}
                    type='number'
                    value={exercise.reps}
                    onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)}
                    error={errors[`reps_${index}`]}
                  />

                  <Input
                    label='Sets'
                    icon={FaTh}
                    type='number'
                    value={exercise.sets}
                    onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)}
                    error={errors[`sets_${index}`]}
                  />

                  <Input
                    label='Duration (minutes)'
                    icon={FaClock}
                    type='number'
                    value={exercise.duration}
                    onChange={(e) => handleExerciseChange(index, 'duration', e.target.value)}
                    error={errors[`duration_${index}`]}
                  />
                </div>
              ))}

              <div className='flex justify-between items-center mt-6'>
                <button
                  type='button'
                  onClick={addExercise}
                  className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
                >
                  Add Exercise
                </button>

                <button
                  type='submit'
                  disabled={isLoading}
                  className={`px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <>
                      <FaSpinner className='animate-spin mr-2' />
                      Saving...
                    </>
                  ) : (
                    'Save Workout'
                  )}
                </button>
              </div>

              {saveSuccess && (
                <div className='mt-4 p-3 bg-green-100 text-green-700 rounded-lg'>
                  Workout saved successfully!
                </div>
              )}
            </form>
          </div>

          {/* Workout History */}
          <div className='bg-white rounded-xl shadow-lg p-6'>
            <h2 className='text-xl font-semibold text-gray-900 mb-6'>
              Workout History
            </h2>
            {isLoading ? (
              <div className='flex justify-center items-center h-32'>
                <FaSpinner className='animate-spin text-2xl text-blue-500' />
              </div>
            ) : workouts.length === 0 ? (
              <p className='text-gray-500 text-center'>No workouts recorded yet.</p>
            ) : (
              <div className='space-y-4'>
                {workouts.map((workout, index) => (
                  <div
                    key={workout.id}
                    className='p-4 bg-gray-50 rounded-lg border border-gray-100'
                  >
                    <div className='flex justify-between items-center mb-2'>
                      <h3 className='font-medium text-gray-900'>
                        {new Date(workout.date).toLocaleDateString()}
                      </h3>
                    </div>
                    <div className='space-y-2'>
                      {workout.exercises.map((exercise, exIndex) => (
                        <div key={exIndex} className='text-sm text-gray-600'>
                          <p>
                            {exercise.name} - {exercise.sets} sets x {exercise.reps} reps
                            {exercise.duration ? ` (${exercise.duration} mins)` : ''}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutPage;
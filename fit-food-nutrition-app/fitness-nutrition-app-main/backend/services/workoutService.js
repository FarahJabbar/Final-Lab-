const Workout = require('../models/Workout');

const createWorkout = async (workoutData) => {
  const workout = new Workout(workoutData);
  return await workout.save();
};

const getWorkoutsByUserId = async (userId) => {
  return await Workout.find({ userId });
};

module.exports = {
  createWorkout,
  getWorkoutsByUserId,
};

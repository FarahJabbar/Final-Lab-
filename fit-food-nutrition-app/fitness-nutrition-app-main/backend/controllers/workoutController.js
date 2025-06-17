const Workout = require('../models/Workout');
const User = require('../models/User');

const createWorkout = async (req, res) => {
  try {
    const { userId, date, exercises } = req.body;

    // Validate required fields
    if (!userId || !date || !exercises || !Array.isArray(exercises)) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate exercises array
    if (exercises.length === 0) {
      return res.status(400).json({ message: 'At least one exercise is required' });
    }

    // Validate each exercise
    for (const exercise of exercises) {
      if (!exercise.name || !exercise.reps || !exercise.sets) {
        return res.status(400).json({ message: 'Each exercise must have a name, reps, and sets' });
      }
    }

    const workout = new Workout({
      userId,
      date,
      exercises: exercises.map(exercise => ({
        name: exercise.name,
        reps: parseInt(exercise.reps),
        sets: parseInt(exercise.sets),
        duration: exercise.duration ? parseInt(exercise.duration) : 0
      }))
    });

    await workout.save();

    // Add workout reference to user
    await User.findByIdAndUpdate(userId, {
      $push: { workouts: workout._id },
    });

    res.status(201).json(workout);
  } catch (error) {
    console.error('Error creating workout:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getWorkoutsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const workouts = await Workout.find({ userId }).sort({ date: -1 });
    res.json(workouts);
  } catch (error) {
    console.error('Error fetching workouts:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createWorkout,
  getWorkoutsByUserId,
};

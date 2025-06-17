const express = require('express');
const workoutController = require('../controllers/workoutController');

const router = express.Router();

router.post('/', workoutController.createWorkout);
router.get('/:userId', workoutController.getWorkoutsByUserId);

module.exports = router;

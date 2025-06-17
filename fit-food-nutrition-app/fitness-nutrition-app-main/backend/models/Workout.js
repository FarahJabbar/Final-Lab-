const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  date: { 
    type: String, 
    required: true 
  },
  exercises: [{
    name: { 
      type: String, 
      required: true,
      trim: true 
    },
    reps: { 
      type: Number, 
      required: true,
      min: 1 
    },
    sets: { 
      type: Number, 
      required: true,
      min: 1 
    },
    duration: { 
      type: Number, 
      default: 0,
      min: 0 
    }
  }]
}, {
  timestamps: true
});

// Add index for faster queries
workoutSchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model('Workout', workoutSchema);

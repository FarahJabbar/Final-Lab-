const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  weight: Number,
  height: Number,
  gender: String,
  fitnessLevel: String,
  healthCondition: String,
  goal: String,
  email: { type: String, unique: true },
  password: String,
  meals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }],
  workouts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
  aiSuggestions: [
    {
      question: String,
      answer: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

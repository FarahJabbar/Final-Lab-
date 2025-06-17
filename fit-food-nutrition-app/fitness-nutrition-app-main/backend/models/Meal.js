const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: String,
  mealType: String,
  foods: [
    {
      name: String,
      calories: Number,
      protein: Number,
      carbs: Number,
      fats: Number,
    },
  ],
});

module.exports = mongoose.model('Meal', mealSchema);

const Meal = require('../models/Meal');
const User = require('../models/User');

const createMeal = async (req, res) => {
  try {
    const meal = new Meal(req.body);
    await meal.save();

    // Add meal reference to user
    await User.findByIdAndUpdate(meal.userId, { $push: { meals: meal._id } });

    res.status(201).json(meal);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getMealsByUserId = async (req, res) => {
  try {
    const meals = await Meal.find({ userId: req.params.userId });
    res.json(meals);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createMeal,
  getMealsByUserId,
};

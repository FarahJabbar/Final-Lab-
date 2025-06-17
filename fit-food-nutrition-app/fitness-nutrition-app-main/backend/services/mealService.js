const Meal = require('../models/Meal');

const createMeal = async (mealData) => {
  const meal = new Meal(mealData);
  return await meal.save();
};

const getMealsByUserId = async (userId) => {
  return await Meal.find({ userId });
};

module.exports = {
  createMeal,
  getMealsByUserId,
};

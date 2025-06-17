import React, { useState, useContext } from 'react';
import { AuthContext } from '../App';
import { FaAppleAlt, FaWeight, FaRuler, FaCalculator } from 'react-icons/fa';

const NutritionCalculator = () => {
  const { userData } = useContext(AuthContext);
  const [foods, setFoods] = useState([{ name: '', calories: '', protein: '', carbs: '', fats: '' }]);
  const [totalNutrition, setTotalNutrition] = useState({ calories: 0, protein: 0, carbs: 0, fats: 0 });
  const [bmi, setBmi] = useState(null);
  const [dailyCalories, setDailyCalories] = useState(null);
  const [macroDistribution, setMacroDistribution] = useState(null);

  const handleAddFood = () => {
    setFoods([...foods, { name: '', calories: '', protein: '', carbs: '', fats: '' }]);
  };

  const handleRemoveFood = (index) => {
    setFoods(foods.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, field, value) => {
    const updatedFoods = [...foods];
    updatedFoods[index][field] = value;
    setFoods(updatedFoods);
  };

  const calculateNutrition = () => {
    const totals = { calories: 0, protein: 0, carbs: 0, fats: 0 };
    foods.forEach(food => {
      totals.calories += parseFloat(food.calories) || 0;
      totals.protein += parseFloat(food.protein) || 0;
      totals.carbs += parseFloat(food.carbs) || 0;
      totals.fats += parseFloat(food.fats) || 0;
    });
    setTotalNutrition(totals);

    // Calculate macro distribution
    const totalMacros = totals.protein + totals.carbs + totals.fats;
    if (totalMacros > 0) {
      setMacroDistribution({
        protein: (totals.protein / totalMacros * 100).toFixed(1),
        carbs: (totals.carbs / totalMacros * 100).toFixed(1),
        fats: (totals.fats / totalMacros * 100).toFixed(1)
      });
    }
  };

  const calculateBMI = () => {
    if (userData.weight && userData.height) {
      const heightInMeters = userData.height / 100;
      const bmiValue = (userData.weight / (heightInMeters * heightInMeters)).toFixed(1);
      setBmi(bmiValue);
    }
  };

  const calculateDailyCalories = () => {
    if (userData.weight && userData.height && userData.age && userData.gender) {
      // Using Mifflin-St Jeor Equation
      let bmr;
      if (userData.gender === 'male') {
        bmr = 10 * userData.weight + 6.25 * userData.height - 5 * userData.age + 5;
      } else {
        bmr = 10 * userData.weight + 6.25 * userData.height - 5 * userData.age - 161;
      }

      // Activity multiplier (assuming moderate activity)
      const activityMultiplier = 1.55;
      const dailyCalories = Math.round(bmr * activityMultiplier);
      setDailyCalories(dailyCalories);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-8'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h1 className='text-3xl font-bold text-center mb-8'>Nutrition Calculator</h1>
        
        {/* BMI and Daily Calories Section */}
        <div className='bg-white rounded-lg shadow-md p-6 mb-8'>
          <h2 className='text-xl font-semibold mb-4'>Your Health Metrics</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='p-4 border border-gray-200 rounded'>
              <div className='flex items-center mb-2'>
                <FaWeight className='text-blue-500 mr-2' />
                <h3 className='font-medium'>BMI Calculator</h3>
              </div>
              <p className='text-gray-600 mb-2'>Weight: {userData.weight}kg</p>
              <p className='text-gray-600 mb-2'>Height: {userData.height}cm</p>
              <button
                onClick={calculateBMI}
                className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'
              >
                Calculate BMI
              </button>
              {bmi && (
                <div className='mt-2'>
                  <p className='font-medium'>Your BMI: {bmi}</p>
                  <p className='text-sm text-gray-600'>
                    {bmi < 18.5 ? 'Underweight' :
                     bmi < 25 ? 'Normal weight' :
                     bmi < 30 ? 'Overweight' : 'Obese'}
                  </p>
                </div>
              )}
            </div>

            <div className='p-4 border border-gray-200 rounded'>
              <div className='flex items-center mb-2'>
                <FaCalculator className='text-green-500 mr-2' />
                <h3 className='font-medium'>Daily Calorie Needs</h3>
              </div>
              <p className='text-gray-600 mb-2'>Age: {userData.age} years</p>
              <p className='text-gray-600 mb-2'>Gender: {userData.gender}</p>
              <button
                onClick={calculateDailyCalories}
                className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition'
              >
                Calculate Daily Calories
              </button>
              {dailyCalories && (
                <div className='mt-2'>
                  <p className='font-medium'>Daily Calorie Needs: {dailyCalories} kcal</p>
                  <p className='text-sm text-gray-600'>Based on moderate activity level</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Food Calculator Section */}
        <div className='bg-white rounded-lg shadow-md p-6'>
          <h2 className='text-xl font-semibold mb-4'>Food Nutrition Calculator</h2>
          {foods.map((food, index) => (
            <div key={index} className='mb-4 p-4 border border-gray-200 rounded'>
              <div className='flex items-center mb-2'>
                <FaAppleAlt className='text-red-500 mr-2' />
                <h3 className='font-medium'>Food Item {index + 1}</h3>
              </div>
              <input
                type='text'
                placeholder='Food Name'
                value={food.name}
                onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                className='mb-2 p-2 border rounded w-full'
              />
              <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
                <input
                  type='number'
                  placeholder='Calories'
                  value={food.calories}
                  onChange={(e) => handleInputChange(index, 'calories', e.target.value)}
                  className='p-2 border rounded'
                />
                <input
                  type='number'
                  placeholder='Protein (g)'
                  value={food.protein}
                  onChange={(e) => handleInputChange(index, 'protein', e.target.value)}
                  className='p-2 border rounded'
                />
                <input
                  type='number'
                  placeholder='Carbs (g)'
                  value={food.carbs}
                  onChange={(e) => handleInputChange(index, 'carbs', e.target.value)}
                  className='p-2 border rounded'
                />
                <input
                  type='number'
                  placeholder='Fats (g)'
                  value={food.fats}
                  onChange={(e) => handleInputChange(index, 'fats', e.target.value)}
                  className='p-2 border rounded'
                />
              </div>
              {index > 0 && (
                <button
                  onClick={() => handleRemoveFood(index)}
                  className='mt-2 text-red-500 hover:text-red-700'
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          
          <div className='flex gap-4 mt-4'>
            <button
              onClick={handleAddFood}
              className='bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition'
            >
              Add Food
            </button>
            <button
              onClick={calculateNutrition}
              className='bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition'
            >
              Calculate
            </button>
          </div>

          {/* Results Section */}
          {(totalNutrition.calories > 0 || macroDistribution) && (
            <div className='mt-6 p-4 bg-gray-50 rounded'>
              <h2 className='text-xl font-semibold mb-4'>Nutrition Summary</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <h3 className='font-medium mb-2'>Total Nutrition</h3>
                  <p>Calories: {totalNutrition.calories} kcal</p>
                  <p>Protein: {totalNutrition.protein}g</p>
                  <p>Carbs: {totalNutrition.carbs}g</p>
                  <p>Fats: {totalNutrition.fats}g</p>
                </div>
                {macroDistribution && (
                  <div>
                    <h3 className='font-medium mb-2'>Macro Distribution</h3>
                    <p>Protein: {macroDistribution.protein}%</p>
                    <p>Carbs: {macroDistribution.carbs}%</p>
                    <p>Fats: {macroDistribution.fats}%</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NutritionCalculator; 
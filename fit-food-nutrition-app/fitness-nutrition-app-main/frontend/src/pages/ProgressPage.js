import React, { useContext } from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { AuthContext } from '../App';
import { FaAppleAlt, FaBurn, FaDumbbell } from 'react-icons/fa';

const ProgressPage = () => {
  const { userData } = useContext(AuthContext);
  const { workouts, meals } = userData;

  const totalWorkouts = workouts.length;
  const totalMeals = meals.length;
  const totalCalories = meals.reduce(
    (acc, meal) =>
      acc +
      meal.foods.reduce(
        (sum, food) => sum + (parseFloat(food.calories) || 0),
        0
      ),
    0
  );

  // Group meals by day
  const mealsByDay = meals.reduce((acc, meal) => {
    const date = meal.date;
    if (!acc[date]) {
      acc[date] = { date, calories: 0 };
    }
    acc[date].calories += meal.foods.reduce(
      (sum, food) => sum + (parseFloat(food.calories) || 0),
      0
    );
    return acc;
  }, {});

  const calorieData = Object.values(mealsByDay);

  // Group workouts by day
  const workoutsByDay = workouts.reduce((acc, workout) => {
    const date = workout.date;
    if (!acc[date]) {
      acc[date] = { date, exercises: 0 };
    }
    acc[date].exercises += workout.exercises.length;
    return acc;
  }, {});

  const workoutData = Object.values(workoutsByDay);

  const StatCard = ({ icon: Icon, title, value, subtitle, color }) => (
    <div className='bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='text-gray-500 text-sm font-medium mb-1'>{title}</h3>
          <div className='flex items-baseline'>
            <span className='text-3xl font-bold text-gray-900'>{value}</span>
            {subtitle && (
              <span className='text-sm text-gray-500 ml-2'>{subtitle}</span>
            )}
          </div>
        </div>
        <Icon className={`text-${color}-500 w-10 h-10`} />
      </div>
    </div>
  );

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-900 mb-2'>Progress</h1>
          <p className='text-gray-600'>Track your fitness progress</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
          <StatCard
            icon={FaDumbbell}
            title='Total Workouts'
            value={workoutData.length}
            color='blue'
          />
          <StatCard
            icon={FaAppleAlt}
            title='Total Meals'
            value={totalMeals}
            color='green'
          />
          <StatCard
            icon={FaBurn}
            title='Total Calories'
            value={totalCalories}
            color='red'
          />
        </div>

        <div className='bg-white rounded-xl shadow-lg p-6 mb-8'>
          <h2 className='text-xl font-semibold text-gray-800 mb-6'>
            Caloric Intake
          </h2>
          <ResponsiveContainer width='100%' height={400}>
            <AreaChart data={calorieData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='date' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type='monotone'
                dataKey='calories'
                stroke='#FF6347'
                fill='#FF6347'
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className='bg-white rounded-xl shadow-lg p-6 mb-8'>
          <h2 className='text-xl font-semibold text-gray-800 mb-6'>
            Workout History
          </h2>
          <ResponsiveContainer width='100%' height={400}>
            <AreaChart data={workoutData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='date' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type='monotone'
                dataKey='exercises'
                stroke='#1E90FF'
                fill='#1E90FF'
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;

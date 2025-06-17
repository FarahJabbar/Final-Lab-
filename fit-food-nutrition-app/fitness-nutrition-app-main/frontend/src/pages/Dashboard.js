import React, { useContext, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import {
  Activity,
  User,
  Target,
  Utensils,
  Dumbbell,
  Calendar,
  TrendingUp,
  ActivityIcon,
  Calculator,
  Users,
  Heart,
} from 'lucide-react';
import { AuthContext } from '../App';
import { StatCard } from '../components/StatCard';
import { ChartCard } from '../components/ChartCard';
import { FaDumbbell, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { userData, setUserData } = useContext(AuthContext);
  const [selectedMealType, setSelectedMealType] = useState('all');
  const navigate = useNavigate();

  const processNutritionData = () => {
    const totals = { protein: 0, carbs: 0, fats: 0 };
    userData?.meals?.forEach((meal) => {
      if (selectedMealType === 'all' || meal.mealType === selectedMealType) {
        meal.foods.forEach((food) => {
          totals.protein += food.protein || 0;
          totals.carbs += food.carbs || 0;
          totals.fats += food.fats || 0;
        });
      }
    });
    return [
      { name: 'Protein', value: totals.protein },
      { name: 'Carbs', value: totals.carbs },
      { name: 'Fats', value: totals.fats },
    ];
  };

  const processMealData = () => {
    const dailyCalories = {};
    userData?.meals?.forEach((meal) => {
      if (selectedMealType === 'all' || meal.mealType === selectedMealType) {
        const calories = meal.foods.reduce(
          (sum, food) => sum + (food.calories || 0),
          0
        );
        if (!dailyCalories[meal.date]) {
          dailyCalories[meal.date] = calories;
        } else {
          dailyCalories[meal.date] += calories;
        }
      }
    });

    return Object.entries(dailyCalories)
      .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
      .map(([date, calories]) => ({
        name: new Date(date).toLocaleDateString(),
        calories,
      }));
  };

  const processWorkoutData = () => {
    const workoutsByDate = {};
    userData.workouts?.forEach((workout) => {
      const date = workout.date;
      if (!workoutsByDate[date]) {
        workoutsByDate[date] = {
          exercises: new Set(),
          totalSets: 0,
          totalReps: 0,
          totalDuration: 0,
        };
      }

      workout?.exercises.forEach((exercise) => {
        workoutsByDate[date].exercises.add(exercise.name);
        workoutsByDate[date].totalSets += exercise.sets || 0;
        workoutsByDate[date].totalReps += exercise.reps || 0;
        workoutsByDate[date].totalDuration += exercise.duration || 0;
      });
    });

    return Object.entries(workoutsByDate)
      .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
      .map(([date, stats]) => ({
        name: new Date(date).toLocaleDateString(),
        exercises: stats.exercises.size,
        sets: stats.totalSets,
        reps: stats.totalReps,
        duration: stats.totalDuration,
      }));
  };

  const getMealTypes = () => {
    const types = new Set(userData?.meals?.map((meal) => meal.mealType));
    return ['all', ...Array.from(types)];
  };

  const getExerciseStats = () => {
    // Initialize stats with default values
    const stats = {
      totalWorkouts: 0,
      uniqueExercises: new Set(),
      totalSets: 0,
      totalReps: 0,
      totalDuration: 0,
    };

    // Check if workouts exist, if not return default stats
    if (!userData?.workouts) {
      return {
        ...stats,
        uniqueExercises: 0,
      };
    }

    stats.totalWorkouts = userData.workouts.length;

    userData.workouts.forEach((workout) => {
      if (workout?.exercises) {
        workout.exercises.forEach((exercise) => {
          if (exercise?.name) {
            stats.uniqueExercises.add(exercise.name);
          }
          stats.totalSets += exercise?.sets || 0;
          stats.totalReps += exercise?.reps || 0;
          stats.totalDuration += exercise?.duration || 0;
        });
      }
    });

    return {
      ...stats,
      uniqueExercises: stats.uniqueExercises.size,
    };
  };

  const chartColors = {
    calories: '#10B981',
    workouts: '#6366F1',
    weight: '#F59E0B',
    nutrition: ['#EF4444', '#10B981', '#6366F1'],
  };

  // Feature list
  const features = [
    { title: 'Track Your Workouts', page: '/workouts' },
    { title: 'Meal Planning', page: '/meals' },
    { title: 'Workout Plans', page: '/workout-plans' },
    { title: 'Monitor Your Progress', page: '/progress' },
    { title: 'Join a Community', page: '/community' },
    { title: 'Health Insights', page: '/health-insights' },
    { title: 'Workout Scheduler', page: '/workout-scheduler' },
    { title: 'Running Tracker', page: '/running-tracker' },
    { title: 'Weight Management', page: '/weight-management' },
    { title: 'Calculate Nutrition', page: '/nutrition-calculator' }
  ];

  // Delete user handler
  const handleDeleteUser = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        await fetch(`/api/users/${userId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setUserData({ isLoggedIn: false });
        navigate('/signup');
      } catch (err) {
        alert('Error deleting user');
      }
    }
  };

  // Process data for graphs
  const nutritionData = processNutritionData();
  const mealData = processMealData();
  const workoutData = processWorkoutData();
  const exerciseStats = getExerciseStats();

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-100 to-purple-100'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='flex flex-col items-center mb-8'>
          <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2'>
            Fitness Journey
          </h1>
          <p className='text-gray-600 text-lg'>
            Track your progress and stay motivated
          </p>
        </div>

        {/* Quick Stats Section */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
          <div className='bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500'>
            <h3 className='text-lg font-semibold text-gray-700'>Today's Progress</h3>
            <div className='mt-2'>
              <p className='text-2xl font-bold text-blue-600'>85%</p>
              <p className='text-sm text-gray-500'>Daily Goal Completion</p>
            </div>
          </div>
          <div className='bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500'>
            <h3 className='text-lg font-semibold text-gray-700'>Weekly Streak</h3>
            <div className='mt-2'>
              <p className='text-2xl font-bold text-green-600'>5 Days</p>
              <p className='text-sm text-gray-500'>Consistent Workouts</p>
            </div>
          </div>
          <div className='bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500'>
            <h3 className='text-lg font-semibold text-gray-700'>Calories Burned</h3>
            <div className='mt-2'>
              <p className='text-2xl font-bold text-purple-600'>1,250</p>
              <p className='text-sm text-gray-500'>Today's Total</p>
            </div>
          </div>
        </div>

        {/* Daily Goals Progress */}
        <div className='bg-white rounded-xl shadow-md p-6 mb-8'>
          <h2 className='text-xl font-semibold mb-4'>Daily Goals Progress</h2>
          <div className='space-y-4'>
            <div>
              <div className='flex justify-between mb-1'>
                <span className='text-sm font-medium text-gray-700'>Steps</span>
                <span className='text-sm font-medium text-gray-700'>8,500/10,000</span>
              </div>
              <div className='w-full bg-gray-200 rounded-full h-2.5'>
                <div className='bg-blue-600 h-2.5 rounded-full' style={{width: '85%'}}></div>
              </div>
            </div>
            <div>
              <div className='flex justify-between mb-1'>
                <span className='text-sm font-medium text-gray-700'>Water Intake</span>
                <span className='text-sm font-medium text-gray-700'>1.5L/2L</span>
              </div>
              <div className='w-full bg-gray-200 rounded-full h-2.5'>
                <div className='bg-green-600 h-2.5 rounded-full' style={{width: '75%'}}></div>
              </div>
            </div>
            <div>
              <div className='flex justify-between mb-1'>
                <span className='text-sm font-medium text-gray-700'>Workout Time</span>
                <span className='text-sm font-medium text-gray-700'>35/45 min</span>
              </div>
              <div className='w-full bg-gray-200 rounded-full h-2.5'>
                <div className='bg-purple-600 h-2.5 rounded-full' style={{width: '78%'}}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className='mb-8'>
          <h2 className='text-2xl font-bold mb-4'>Features</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {features.map((feature, idx) => (
              <button
                key={idx}
                className='bg-white rounded-lg shadow-md p-6 text-center font-semibold hover:bg-green-50 transition border border-green-100'
                onClick={() => {
                  if (feature.page) {
                    navigate(feature.page);
                  } else {
                    alert('Feature not implemented yet!');
                  }
                }}
              >
                {feature.title}
              </button>
            ))}
          </div>
        </div>

        <div className='flex flex-col items-center mb-8'>
          <h1 className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2'>
            Fitness Journey
          </h1>
          <p className='text-gray-600 text-lg'>
            Track your progress and stay motivated
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <StatCard
            icon={FaUser}
            title='Profile'
            value={userData.gender}
            subValue={`${userData.age} years old`}
            color='blue'
          />
          <StatCard
            icon={ActivityIcon}
            title='Measurements'
            value={`${userData.weight}kg`}
            subValue={`Height: ${userData.height}cm`}
            color='green'
          />
          <StatCard
            icon={Target}
            title='Goal'
            value={userData.goal}
            color='yellow'
          />
          <StatCard
            icon={FaDumbbell}
            title='Workouts'
            value={exerciseStats.totalWorkouts}
            subValue='Total sessions'
            color='purple'
          />
        </div>

        <div className='bg-white rounded-xl shadow-sm p-4 mb-6'>
          <div className='flex gap-2 overflow-x-auto pb-2'>
            {getMealTypes().map((type) => (
              <button
                key={type}
                className={`px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap
                  ${
                    selectedMealType === type
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-green-50 border border-gray-200'
                  }`}
                onClick={() => setSelectedMealType(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <ChartCard title='Caloric Intake' icon={Utensils}>
            <ResponsiveContainer width='100%' height={300}>
              <LineChart data={mealData}>
                <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
                <XAxis dataKey='name' stroke='#6B7280' />
                <YAxis stroke='#6B7280' />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Line
                  type='monotone'
                  dataKey='calories'
                  stroke='#10B981'
                  strokeWidth={2}
                  dot={{ strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title='Workout Activity' icon={Activity}>
            <ResponsiveContainer width='100%' height={300}>
              <BarChart data={workoutData}>
                <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
                <XAxis dataKey='name' stroke='#6B7280' />
                <YAxis stroke='#6B7280' />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Bar dataKey='exercises' fill='#6366F1' radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title='Nutrition Distribution' icon={TrendingUp}>
            <ResponsiveContainer width='100%' height={300}>
              <PieChart>
                <Pie
                  data={nutritionData}
                  dataKey='value'
                  nameKey='name'
                  cx='50%'
                  cy='50%'
                  outerRadius={100}
                  innerRadius={60}
                  label
                >
                  {nutritionData?.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={chartColors.nutrition[index % 3]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title='Exercise Summary' icon={Calendar}>
            <div className='grid grid-cols-2 gap-4'>
              {[
                {
                  label: 'Unique Exercises',
                  value: exerciseStats.uniqueExercises,
                },
                { label: 'Total Sets', value: exerciseStats.totalSets },
                { label: 'Total Reps', value: exerciseStats.totalReps },
                { label: 'Duration (min)', value: exerciseStats.totalDuration },
              ].map((stat, index) => (
                <div
                  key={index}
                  className='bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors'
                >
                  <p className='text-gray-600 text-sm mb-1'>{stat.label}</p>
                  <p className='text-2xl font-bold text-gray-900'>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import WorkoutPage from './pages/WorkoutPage';
import MealPage from './pages/MealPage';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ProgressPage from './pages/ProgressPage';
import AiAssistant from './pages/AiAssistant';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NutritionCalculator from './pages/NutritionCalculator';
import WorkoutPlans from './pages/WorkoutPlans';
import Community from './pages/Community';
import HealthInsights from './pages/HealthInsights';
import WorkoutScheduler from './pages/WorkoutScheduler';
import RunningTracker from './pages/RunningTracker';
import WeightManagement from './pages/WeightManagement';
import axiosInstance from './axiosInstance';

export const AuthContext = createContext(null);

const App = () => {
  const [userData, setUserData] = useState({
    isLoggedIn: false,
    name: 'John Doe',
    age: 30,
    weight: 70,
    height: 175,
    gender: 'male',
    fitnessLevel: 'intermediate',
    healthCondition: 'None',
    goal: 'Weight Loss',
    meals: [],
    workouts: [],
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (token && userId) {
        try {
          const response = await axiosInstance.get(`/api/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserData({ ...response.data, isLoggedIn: true });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/workouts' element={<WorkoutPage />} />
          <Route path='/meals' element={<MealPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/progress' element={<ProgressPage />} />
          <Route path='/ai-assistant' element={<AiAssistant />} />
          <Route path='/nutrition-calculator' element={<NutritionCalculator />} />
          <Route path='/workout-plans' element={<WorkoutPlans />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/community' element={<Community />} />
          <Route path='/health-insights' element={<HealthInsights />} />
          <Route path='/workout-scheduler' element={<WorkoutScheduler />} />
          <Route path='/running-tracker' element={<RunningTracker />} />
          <Route path='/weight-management' element={<WeightManagement />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;

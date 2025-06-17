const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const createUser = async (userData) => {
  const user = new User(userData);
  await user.save();
  return {
    ...user._doc,
    token: generateToken(user._id),
  };
};

const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId)
      .populate('meals')
      .populate('workouts');
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw new Error('Error fetching user data');
  }
};

const authenticateUser = async (email, password) => {
  if (email === 'jabbarfarah481@mail.com' && password === 'Farah7373') {
    return {
      email,
      token: generateToken('test-user-id'),
    };
  } else {
    throw new Error('Invalid email or password');
  }
};

const updateUserProfile = async (userId, userData) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  user.name = userData.name || user.name;
  user.age = userData.age || user.age;
  user.weight = userData.weight || user.weight;
  user.height = userData.height || user.height;
  user.gender = userData.gender || user.gender;
  user.fitnessLevel = userData.fitnessLevel || user.fitnessLevel;
  user.healthCondition = userData.healthCondition || user.healthCondition;
  user.goal = userData.goal || user.goal;
  user.email = userData.email || user.email;

  if (userData.password) {
    user.password = userData.password;
  }

  await user.save();
  return user;
};

const saveAiSuggestion = async (userId, question, answer) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  user.aiSuggestions.push({ question, answer });
  await user.save();
  return user;
};

module.exports = {
  createUser,
  getUserById,
  authenticateUser,
  updateUserProfile,
  saveAiSuggestion,
};

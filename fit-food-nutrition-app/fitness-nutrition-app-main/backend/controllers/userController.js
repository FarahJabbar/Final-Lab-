const userService = require('../services/userService');
const { getAiSuggestion } = require('../aiAssistant');

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).send(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).send(error.message);
  }
};

const authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.authenticateUser(email, password);
    res.status(200).send(user);
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(401).send('Invalid email or password');
  }
};

const updateUserProfile = async (req, res) => {
  try {
    console.log('Request body:', req.body); // Log the request body
    const user = await userService.updateUserProfile(req.params.id, req.body);
    res.status(200).send(user);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).send(error.message);
  }
};

const getAiSuggestionForUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    const suggestion = await getAiSuggestion(user);
    await userService.saveAiSuggestion(
      req.params.id,
      'Get AI Suggestion',
      suggestion
    );
    res.status(200).send({ suggestion });
  } catch (error) {
    console.error('Error getting AI suggestion:', error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  createUser,
  getUserById,
  authenticateUser,
  updateUserProfile,
  getAiSuggestionForUser,
};

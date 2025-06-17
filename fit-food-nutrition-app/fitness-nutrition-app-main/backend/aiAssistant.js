const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

/**
 * Get AI suggestion based on user information
 * @param {Object} userInfo - User information (e.g., weight, height, goal, etc.)
 * @returns {string} - AI's suggestion
 */
const getAiSuggestion = async (userInfo) => {
  const { weight, height, goal, age, gender, fitnessLevel, healthCondition } =
    userInfo;
  const prompt = `Based on the following user information:
  - Weight: ${weight} kg
  - Height: ${height} cm
  - Age: ${age} years
  - Gender: ${gender}
  - Fitness Level: ${fitnessLevel}
  - Health Condition: ${healthCondition}
  - Goal: ${goal}

  Please provide a personalized fitness and nutrition suggestion.`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text(); // AI's suggestion
  } catch (error) {
    console.error('Error generating AI suggestion:', error);
    throw new Error('AI suggestion failed');
  }
};

module.exports = { getAiSuggestion };

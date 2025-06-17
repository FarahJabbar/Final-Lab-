import React, { useContext, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { BookOpen, CheckCircle, Loader2 } from 'lucide-react';
import { AuthContext } from '../App';
import { renderAiSuggestion } from '../renderAiSuggestion';

const AiAssistantPage = () => {
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useContext(AuthContext);

  const handleGetAiSuggestion = async () => {
    setIsLoading(true);
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      const response = await axiosInstance.get(
        `/api/users/${userId}/ai-suggestion`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const aiSuggestion = response.data.suggestion;
      const newResponse = {
        question: 'Get AI Suggestion',
        answer: aiSuggestion,
      };

      setResponses([...responses, newResponse]);
    } catch (error) {
      console.error('Error getting AI suggestion:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <header className='text-center mb-8'>
          <BookOpen className='w-10 h-10 mx-auto mb-4 text-blue-500' />
          <h1 className='text-4xl font-bold text-gray-900'>AI Assistant</h1>
          <p className='mt-2 text-gray-600'>
            Get personalized meal and workout suggestions
          </p>
        </header>

        <div className='bg-white rounded-lg shadow-lg p-6'>
          <button
            onClick={handleGetAiSuggestion}
            disabled={isLoading}
            className='flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed'
          >
            {isLoading ? (
              <>
                <Loader2 className='w-5 h-5 mr-2 animate-spin' />
                Getting New Suggestion...
              </>
            ) : (
              <>
                <CheckCircle className='w-5 h-5 mr-2' />
                Get New AI Suggestion
              </>
            )}
          </button>
        </div>

        {responses.length > 0 && (
          <div className='mt-6 bg-white rounded-lg shadow-lg p-6'>
            <h2 className='text-2xl font-bold text-green-600 mb-4'>
              Responses
            </h2>
            <div className='border border-gray-300 rounded-lg p-4 bg-green-50'>
              {responses.map((response, index) => (
                <div
                  key={index}
                  className='mb-4 p-4 border border-gray-200 rounded-lg bg-white shadow-sm'
                >
                  <p className='font-semibold text-lg'>
                    You: {response.question}
                  </p>
                  <div className='text-gray-700 mt-2'>
                    {renderAiSuggestion(response.answer)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Suggestions Section */}
        {userData.aiSuggestions && userData.aiSuggestions.length > 0 && (
          <div className='mt-6 bg-white rounded-lg shadow-lg p-6'>
            <h2 className='text-2xl font-bold text-blue-600 mb-4'>
              Your AI Suggestions
            </h2>
            {userData.aiSuggestions.map((suggestion) => (
              <div
                key={suggestion._id}
                className='mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50'
              >
                <p className='font-semibold'>Question: {suggestion.question}</p>
                <p className='mt-2 text-gray-700'>
                  Answer: {renderAiSuggestion(suggestion.answer)}
                </p>
                <p className='text-sm text-gray-500'>
                  Created At: {new Date(suggestion.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AiAssistantPage;

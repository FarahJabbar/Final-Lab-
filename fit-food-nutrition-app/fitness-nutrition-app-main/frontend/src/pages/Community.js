import React, { useState, useEffect, useContext } from 'react';
import { FaHeart, FaComment, FaShare, FaUserCircle, FaUser, FaImage, FaVideo, FaRunning } from 'react-icons/fa';
import { AuthContext } from '../App';

const Community = () => {
  const { userData, setUserData } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    // Load posts from localStorage
    const savedPosts = JSON.parse(localStorage.getItem('communityPosts') || '[]');
    setPosts(savedPosts);
  }, []);

  const handlePost = () => {
    if (newPost.trim()) {
      const post = {
        id: Date.now(),
        user: userData.name || 'Anonymous',
        avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
        content: newPost,
        timestamp: 'Just now',
        likes: 0,
        comments: 0,
        shares: 0
      };

      const updatedPosts = [post, ...posts];
      setPosts(updatedPosts);
      
      // Save to localStorage
      localStorage.setItem('communityPosts', JSON.stringify(updatedPosts));
      
      // Update userData context
      setUserData(prevData => ({
        ...prevData,
        communityPosts: updatedPosts
      }));
      
      setNewPost('');
    }
  };

  const handleLike = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    });
    
    setPosts(updatedPosts);
    localStorage.setItem('communityPosts', JSON.stringify(updatedPosts));
  };

  const handleComment = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, comments: post.comments + 1 };
      }
      return post;
    });
    
    setPosts(updatedPosts);
    localStorage.setItem('communityPosts', JSON.stringify(updatedPosts));
  };

  const handleShare = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, shares: post.shares + 1 };
      }
      return post;
    });
    
    setPosts(updatedPosts);
    localStorage.setItem('communityPosts', JSON.stringify(updatedPosts));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Fitness Community</h1>
      
      {/* Create Post Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white mr-3">
            <FaUser />
          </div>
          <div>
            <h3 className="font-semibold">Create Post</h3>
            <p className="text-sm text-gray-500">Share your fitness journey</p>
          </div>
        </div>
        <textarea
          className="w-full p-3 border rounded-lg mb-4"
          rows="3"
          placeholder="What's on your mind?"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        ></textarea>
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <button className="flex items-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
              <FaImage className="mr-2" />
              Photo
            </button>
            <button className="flex items-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
              <FaVideo className="mr-2" />
              Video
            </button>
          </div>
          <button 
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={handlePost}
          >
            Post
          </button>
        </div>
      </div>

      {/* Start Run Button */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md p-6 mb-6 text-center">
        <button className="w-full py-4 text-white text-lg font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center">
          <FaRunning className="mr-2 text-2xl" />
          Start Run
        </button>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <img
                src={post.avatar}
                alt={post.user}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <h3 className="font-semibold">{post.user}</h3>
                <p className="text-sm text-gray-500">{post.timestamp}</p>
              </div>
            </div>
            <p className="mb-4">{post.content}</p>
            <div className="flex items-center space-x-4 text-gray-500">
              <button 
                className="flex items-center hover:text-blue-500"
                onClick={() => handleLike(post.id)}
              >
                <FaHeart className="mr-1" />
                {post.likes}
              </button>
              <button 
                className="flex items-center hover:text-blue-500"
                onClick={() => handleComment(post.id)}
              >
                <FaComment className="mr-1" />
                {post.comments}
              </button>
              <button 
                className="flex items-center hover:text-blue-500"
                onClick={() => handleShare(post.id)}
              >
                <FaShare className="mr-1" />
                {post.shares}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community; 
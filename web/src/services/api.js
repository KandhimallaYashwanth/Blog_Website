import axios from 'axios';
import toast from 'react-hot-toast';
import { mockAuthAPI, mockPostsAPI } from './mockApi';

// Check if we should use mock API (when backend is not available)
const USE_MOCK_API = process.env.REACT_APP_USE_MOCK_API === 'true';
const USE_BACKEND_API = !USE_MOCK_API;

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    // Client-side validation for JWT token format
    const isValidToken = token && /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_.+/=]*$/.test(token);

    if (isValidToken) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (token) {
      // Token exists but is malformed/invalid, clear session and redirect
      console.error('Malformed or invalid JWT token detected on client side. Clearing session.');
      toast.error('Your session is invalid. Please log in again.');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login'; // Redirect to login page
      return Promise.reject(new axios.Cancel('Token is invalid, request cancelled.'));
    }
    // If no token, or token is valid, proceed normally (backend will handle missing token or expiry)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    const message = error.response?.data?.message || 'Something went wrong';
    toast.error(message);
    
    return Promise.reject(error);
  }
);

// Auth API with fallback to mock
export const authAPI = {
  login: async (email, password) => {
    if (USE_MOCK_API) {
      try {
        return await mockAuthAPI.login(email, password);
      } catch (error) {
        console.log('Using mock API for login');
        return await mockAuthAPI.login(email, password);
      }
    }
    return api.post('/auth/login', { email, password });
  },
  
  register: async (name, email, password) => {
    if (USE_MOCK_API) {
      try {
        return await mockAuthAPI.register(name, email, password);
      } catch (error) {
        console.log('Using mock API for register');
        return await mockAuthAPI.register(name, email, password);
      }
    }
    return api.post('/auth/register', { name, email, password });
  },
  
  googleAuth: async (googleData) => {
    if (USE_MOCK_API) {
      try {
        return await mockAuthAPI.googleAuth(googleData);
      } catch (error) {
        console.log('Using mock API for Google auth');
        return await mockAuthAPI.googleAuth(googleData);
      }
    }
    return api.post('/auth/google', googleData);
  },
  
  updateProfile: async (profileData) => {
    if (USE_MOCK_API) {
      try {
        return await mockAuthAPI.updateProfile(profileData);
      } catch (error) {
        console.log('Using mock API for update profile');
        return await mockAuthAPI.updateProfile(profileData);
      }
    }
    return api.put('/auth/profile', profileData);
  },
  
  getProfile: () => api.get('/auth/profile'),
};

// Posts API with fallback to mock
export const postsAPI = {
  getAllPosts: async () => {
    if (USE_MOCK_API) {
      try {
        return await mockPostsAPI.getAllPosts();
      } catch (error) {
        console.log('Using mock API for get all posts');
        return await mockPostsAPI.getAllPosts();
      }
    }
    return api.get('/posts');
  },
  
  getPost: async (postId) => {
    if (USE_MOCK_API) {
      try {
        return await mockPostsAPI.getPost(postId);
      } catch (error) {
        console.log('Using mock API for get post');
        return await mockPostsAPI.getPost(postId);
      }
    }
    return api.get(`/posts/${postId}`);
  },
  
  createPost: async (postData) => {
    if (USE_MOCK_API) {
      try {
        return await mockPostsAPI.createPost(postData);
      } catch (error) {
        console.log('Using mock API for create post');
        return await mockPostsAPI.createPost(postData);
      }
    }
    return api.post('/posts', postData);
  },
  
  updatePost: async (postId, postData) => {
    if (USE_MOCK_API) {
      try {
        return await mockPostsAPI.updatePost(postId, postData);
      } catch (error) {
        console.log('Using mock API for update post');
        return await mockPostsAPI.updatePost(postId, postData);
      }
    }
    return api.put(`/posts/${postId}`, postData);
  },
  
  deletePost: async (postId) => {
    if (USE_MOCK_API) {
      try {
        return await mockPostsAPI.deletePost(postId);
      } catch (error) {
        console.log('Using mock API for delete post');
        return await mockPostsAPI.deletePost(postId);
      }
    }
    return api.delete(`/posts/${postId}`);
  },
  
  getUserPosts: async (userId) => {
    if (USE_MOCK_API) {
      try {
        return await mockPostsAPI.getUserPosts(userId);
      } catch (error) {
        console.log('Using mock API for get user posts');
        return await mockPostsAPI.getUserPosts(userId);
      }
    }
    return api.get(`/posts/user/${userId}`);
  },
  
  uploadImage: async (imageData) => {
    if (USE_MOCK_API) {
      try {
        return await mockPostsAPI.uploadImage(imageData);
      } catch (error) {
        console.log('Using mock API for upload image');
        return await mockPostsAPI.uploadImage(imageData);
      }
    }
    return api.post('/posts/upload', imageData);
  },

  likePost: async (postId) => {
    if (USE_MOCK_API) {
      return mockPostsAPI.likePost(postId);
    }
    return api.post(`/posts/${postId}/like`);
  },

  addComment: async (postId, content) => {
    if (USE_MOCK_API) {
      return mockPostsAPI.addComment(postId, content);
    }
    return api.post(`/posts/${postId}/comment`, { content });
  },
};

export default api;


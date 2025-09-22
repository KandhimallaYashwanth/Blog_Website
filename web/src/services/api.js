import axios from 'axios';
import toast from 'react-hot-toast';

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
    const requestUrl = error.config?.url || '';
    const isAuthRoute = requestUrl.includes('/auth/login') || requestUrl.includes('/auth/register') || requestUrl.includes('/auth/google');

    if (error.response?.status === 401 && !isAuthRoute) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      const onLoginPage = window.location.pathname === '/login';
      if (!onLoginPage) {
        window.location.href = '/login';
      }
    }

    // Avoid duplicate toasts for auth routes; Login/Signup screens handle their own errors
    if (!isAuthRoute) {
      const message = error.response?.data?.message || 'Something went wrong';
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

// Auth API with fallback to mock
export const authAPI = {
  login: async (email, password) => {
    return api.post('/auth/login', { email, password });
  },
  
  register: async (name, email, password) => {
    return api.post('/auth/register', { name, email, password });
  },
  
  googleAuth: async (googleData) => {
    return api.post('/auth/google', googleData);
  },
  
  updateProfile: async (profileData) => {
    return api.put('/auth/profile', profileData);
  },
  
  getProfile: () => api.get('/auth/profile'),
};

// Posts API with fallback to mock
export const postsAPI = {
  getAllPosts: async () => {
    return api.get('/posts');
  },
  
  getPost: async (postId) => {
    console.log(`Frontend: Requesting post with ID: ${postId}`); // Added log
    return api.get(`/posts/${postId}`);
  },
  
  createPost: async (postData) => {
    return api.post('/posts', postData);
  },
  
  updatePost: async (postId, postData) => {
    return api.put(`/posts/${postId}`, postData);
  },
  
  deletePost: async (postId) => {
    return api.delete(`/posts/${postId}`);
  },
  
  getUserPosts: async (userId) => {
    return api.get(`/posts/user/${userId}`);
  },
  
  uploadImage: async (imageData) => {
    return api.post('/posts/upload', imageData);
  },

  likePost: async (postId) => {
    return api.post(`/posts/${postId}/like`);
  },

  addComment: async (postId, content) => {
    return api.post(`/posts/${postId}/comment`, { content });
  },
};

export default api;


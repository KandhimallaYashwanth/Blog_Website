// Mock API for development - simulates backend responses
import { delay } from '../utils/delay';

// Simulate network delay
const simulateApiCall = async (data) => {
  await delay(1000); // 1 second delay to simulate real API
  return { data };
};

// Mock user data
const mockUsers = [
  {
    _id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    profilePicture: null,
    bio: 'Software developer and blogger',
    createdAt: new Date().toISOString()
  }
];

// Mock posts data
const mockPosts = [
  {
    _id: '1',
    title: 'Welcome to BlogSphere!',
    content: 'This is your first blog post. Start writing amazing content and share it with the world!',
    author: mockUsers[0],
    tags: ['welcome', 'getting-started'],
    image: null,
    likes: 0,
    views: 0,
    createdAt: new Date().toISOString()
  }
];

export const mockAuthAPI = {
  login: async (email, password) => {
    console.log('Mock login:', { email, password });
    
    // Simulate API call
    await delay(1000);
    
    // Mock successful login
    const mockToken = 'mock-jwt-token-' + Date.now();
    const mockUser = {
      _id: '1',
      name: 'John Doe',
      email: email,
      profilePicture: null,
      bio: 'Software developer and blogger'
    };
    
    return {
      data: {
        token: mockToken,
        user: mockUser
      }
    };
  },

  register: async (name, email, password) => {
    console.log('Mock register:', { name, email, password });
    
    // Simulate API call
    await delay(1000);
    
    // Mock successful registration
    const mockToken = 'mock-jwt-token-' + Date.now();
    const mockUser = {
      _id: '2',
      name: name,
      email: email,
      profilePicture: null,
      bio: ''
    };
    
    return {
      data: {
        token: mockToken,
        user: mockUser
      }
    };
  },

  googleAuth: async (googleData) => {
    console.log('Mock Google auth:', googleData);
    
    // Simulate API call
    await delay(1000);
    
    // Mock successful Google auth
    const mockToken = 'mock-jwt-token-' + Date.now();
    const mockUser = {
      _id: '3',
      name: googleData.profileObj.name,
      email: googleData.profileObj.email,
      profilePicture: googleData.profileObj.picture,
      bio: ''
    };
    
    return {
      data: {
        token: mockToken,
        user: mockUser
      }
    };
  },

  updateProfile: async (profileData) => {
    console.log('Mock update profile:', profileData);
    
    // Simulate API call
    await delay(1000);
    
    // Mock successful profile update
    const mockUser = {
      _id: '1',
      name: profileData.name,
      email: profileData.email,
      profilePicture: profileData.profilePicture,
      bio: profileData.bio
    };
    
    return {
      data: {
        user: mockUser
      }
    };
  }
};

export const mockPostsAPI = {
  getAllPosts: async () => {
    console.log('Mock get all posts');
    
    // Simulate API call
    await delay(800);
    
    return {
      data: mockPosts
    };
  },

  getPost: async (postId) => {
    console.log('Mock get post:', postId);
    
    // Simulate API call
    await delay(800);
    
    const post = mockPosts.find(p => p._id === postId);
    if (!post) {
      throw new Error('Post not found');
    }
    
    return {
      data: post
    };
  },

  createPost: async (postData) => {
    console.log('Mock create post:', postData);
    
    // Simulate API call
    await delay(1000);
    
    const newPost = {
      _id: Date.now().toString(),
      title: postData.title,
      content: postData.content,
      author: mockUsers[0],
      tags: postData.tags || [],
      image: postData.image || null,
      likes: 0,
      views: 0,
      createdAt: new Date().toISOString()
    };
    
    mockPosts.unshift(newPost); // Add to beginning
    
    return {
      data: newPost
    };
  },

  updatePost: async (postId, postData) => {
    console.log('Mock update post:', postId, postData);
    
    // Simulate API call
    await delay(1000);
    
    const postIndex = mockPosts.findIndex(p => p._id === postId);
    if (postIndex === -1) {
      throw new Error('Post not found');
    }
    
    const updatedPost = {
      ...mockPosts[postIndex],
      ...postData,
      updatedAt: new Date().toISOString()
    };
    
    mockPosts[postIndex] = updatedPost;
    
    return {
      data: updatedPost
    };
  },

  deletePost: async (postId) => {
    console.log('Mock delete post:', postId);
    
    // Simulate API call
    await delay(800);
    
    const postIndex = mockPosts.findIndex(p => p._id === postId);
    if (postIndex === -1) {
      throw new Error('Post not found');
    }
    
    mockPosts.splice(postIndex, 1);
    
    return {
      data: { success: true }
    };
  },

  getUserPosts: async (userId) => {
    console.log('Mock get user posts:', userId);
    
    // Simulate API call
    await delay(800);
    
    // Return posts by the user
    const userPosts = mockPosts.filter(p => p.author._id === userId);
    
    return {
      data: userPosts
    };
  },

  uploadImage: async (imageData) => {
    console.log('Mock upload image');
    
    // Simulate API call
    await delay(2000);
    
    // Mock successful image upload
    const mockImageUrl = `https://via.placeholder.com/800x400/6366f1/ffffff?text=Mock+Image`;
    
    return {
      data: {
        imageUrl: mockImageUrl
      }
    };
  }
};


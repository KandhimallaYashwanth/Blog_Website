# BlogSphere - Full-Stack Blog Application

A modern, feature-rich blog application built with React, Node.js, and Supabase. BlogSphere allows users to create, read, update, and delete blog posts with advanced features like authentication, real-time interactions, and a beautiful user interface.

## 🚀 Project Overview

BlogSphere is a comprehensive blog platform that demonstrates modern web development practices with a focus on user experience, security, and scalability.

## Demo

Check out the live version of BlogSphere:

[Live Website](https://blogsphere-2s7e.onrender.com/)



## Live Links

- **Frontend:** [BlogSphere Frontend](https://blogsphere-2s7e.onrender.com)  
- **Backend (API):** [BlogSphere Backend](https://blogsphere-tnqp.onrender.com)



## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm 
- Supabase account
- Git

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Blog_Website
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Supabase Configuration
SUPABASE_URL=<YOUR_SUPABASE_URL>
SUPABASE_ANON_KEY=<YOUR_SUPABASE_ANON_KEY>
SUPABASE_SERVICE_ROLE_KEY=<YOUR_SUPABASE_SERVICE_ROLE_KEY>

# JWT Configuration
JWT_SECRET=<YOUR_JWT_SECRET>
JWT_EXPIRES_IN=7d

# Google OAuth Client ID
REACT_APP_GOOGLE_CLIENT_ID=<YOUR_GOOGLE_CLIENT_ID>

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# File Upload Configuration
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,image/webp

```

Run the database schema:

1. Open your Supabase dashboard
2. Go to SQL Editor
3. Copy and paste the contents of `backend/supabase-schema.sql`
4. Execute the SQL to create tables, functions, and triggers

Start the backend server:

```bash
npm start
```

### 3. Frontend Setup

```bash
cd web
npm install
```

Create a `.env` file in the web directory:

```env
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
REACT_APP_API_URL=http://localhost:5000/api
```

Start the frontend development server:

```bash
npm start
```

### 4. Google OAuth Setup (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000` (development)
   - Your production domain
6. Update the Google OAuth configuration in your Supabase dashboard


### Key Features

- **User Authentication & Authorization**
  - JWT-based authentication with Supabase Auth
  - Google OAuth integration
  - Protected routes and secure API endpoints
  - Automatic token refresh and session management

- **Blog Management**
  - Create, read, update, and delete posts
  - Rich text content
  - Post search functionality

- **Social Features**
  - Like posts with real-time count updates
  - Comment system 
  - View tracking for posts
  - User profiles with bio and avatar

- **Modern UI/UX**
  - Responsive design with mobile-first approach
  - Dark/light theme support
  - Active navigation states
  - Optimistic UI updates
  - Loading states and error handling

### Tech Stack

**Frontend:**
- React 18 with Hooks
- Redux Toolkit for state management
- React Router for navigation
- SCSS for styling
- React Hook Form for form handling

**Backend:**
- Node.js with Express
- Supabase (PostgreSQL + Auth + Storage)
- JWT authentication
- RESTful API design

**Development Tools:**
- ESLint for code quality
- Prettier for code formatting
- Hot reloading for development


## 📁 Project Structure

```
Blog_Website/
├── backend/                          # Node.js/Express API Server
│   ├── src/
│   │   ├── config/
│   │   │   └── supabase.js          # Database connection configuration
│   │   ├── controllers/
│   │   │   ├── authController.js    # User authentication logic
│   │   │   └── postController.js    # Blog post management logic
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js    # JWT token validation
│   │   │   └── uploadMiddleware.js  # File upload handling
│   │   ├── routes/
│   │   │   ├── authRoutes.js        # Authentication endpoints
│   │   │   └── postRoutes.js        # Blog post endpoints
│   │   └── server.js                # Express server setup
│   ├── supabase-schema.sql          # Database tables and functions
│   ├── package.json                 # Backend dependencies
│   └── README.md                    # Backend documentation
├── web/                             # React Frontend Application
│   ├── public/
│   │   ├── index.html              # Main HTML template
│   │   └── manifest.json           # PWA configuration
│   ├── src/
│   │   ├── components/
│   │   │   ├── GoogleAuth/         # Google OAuth integration
│   │   │   ├── Layout/             # Main app layout and navigation
│   │   │   ├── LoadingSpinner/     # Loading state component
│   │   │   ├── PostCard/           # Individual post display
│   │   │   ├── ProtectedRoute/     # Route protection logic
│   │   │   └── SearchBar/          # Post search functionality
│   │   ├── pages/
│   │   │   ├── CreatePost.js       # New post creation page
│   │   │   ├── EditPost.js         # Post editing page
│   │   │   ├── Home.js             # Main posts feed
│   │   │   ├── Login.js            # User login page
│   │   │   ├── MyPosts.js          # User's own posts
│   │   │   ├── PostDetail.js       # Individual post view
│   │   │   ├── Profile.js          # User profile page
│   │   │   └── Signup.js           # User registration page
│   │   ├── store/
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.js    # Authentication state
│   │   │   │   ├── postsSlice.js   # Posts and comments state
│   │   │   │   └── uiSlice.js      # UI state management
│   │   │   └── store.js            # Redux store configuration
│   │   ├── services/
│   │   │   └── api.js              # API communication layer
│   │   ├── styles/
│   │   │   └── globals.scss        # Global CSS styles
│   │   ├── hooks/
│   │   │   └── useAuth.js          # Authentication hook
│   │   ├── utils/
│   │   │   └── delay.js            # Utility functions
│   │   ├── App.js                  # Main React component
│   │   └── index.js                # React app entry point
│   ├── package.json                # Frontend dependencies
│   └── README.md                   # Frontend documentation
├── SETUP_GUIDE.md                  # Detailed setup instructions
├── BACKEND_SETUP.md               # Backend-specific setup
└── README.md                      # Main project documentation
```

## 📚 API Documentation

### Authentication Endpoints
| Endpoint             | Method | Description                 | Request Body / Params            | Auth Required | Example Request                                                                | Example Response                                                                                                                                      |
| -------------------- | ------ | --------------------------- | -------------------------------- | ------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/api/auth/register` | POST   | Register a new user account | `{ name, email, password }`      | No            | `{ "name": "John Doe", "email": "john@example.com", "password": "secret123" }` | `{ "message": "User registered successfully", "data": { "id": "uuid", "name": "John Doe", "email": "john@example.com", "token": "jwt_token_here" } }` |
| `/api/auth/login`    | POST   | Login with email/password   | `{ email, password }`            | No            | `{ "email": "john@example.com", "password": "secret123" }`                     | `{ "message": "Login successful", "data": { "id": "uuid", "name": "John Doe", "email": "john@example.com", "token": "jwt_token_here" } }`             |
| `/api/auth/google`   | POST   | Login with Google OAuth     | `{ id_token }`                   | No            | `{ "id_token": "google_id_token_here" }`                                       | `{ "message": "Login successful", "data": { "id": "uuid", "name": "John Doe", "email": "john@example.com", "token": "jwt_token_here" } }`             |
| `/api/auth/profile`  | GET    | Get current user profile    | —                                | Yes           | Header: `Authorization: Bearer <token>`                                        | `{ "message": "Profile fetched", "data": { "id": "uuid", "name": "John Doe", "email": "john@example.com", "bio": "", "profile_picture": "" } }`       |
| `/api/auth/profile`  | PUT    | Update current user profile | `{ name, bio, profile_picture }` | Yes           | `{ "name": "John Doe", "bio": "Developer", "profile_picture": "https://..." }` | `{ "message": "Profile updated", "data": { "id": "uuid", "name": "John Doe", "bio": "Developer", "profile_picture": "https://..." } }`                |
| `/api/auth/logout`   | POST   | Logout the current user     | —                                | Yes           | Header: `Authorization: Bearer <token>`                                        | `{ "message": "Logout successful", "data": {} }`                                                                                                      |

### Posts Endpoints
| Endpoint                  | Method | Description                                                                    | Request Body / Params             | Auth Required | Example Request                                                                                | Example Response                                                                                                                                                                                                                                                                                  |
| ------------------------- | ------ | ------------------------------------------------------------------------------ | --------------------------------- | ------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/api/posts/`             | GET    | Get all posts. Optional token includes user-specific info (liked posts, etc.)  | —                                 | Optional      | —                                                                                              | `{ "message": "Posts fetched", "data": [ { "id": "uuid", "title": "My Post", "author": { "id": "uuid", "name": "John Doe" }, "likes": 5, "comments": 2 } ] }`                                                                                                                                     |
| `/api/posts/:id`          | GET    | Get a single post by ID. Increments view count                                 | URL param: `id`                   | Optional      | —                                                                                              | `{ "message": "Post fetched", "data": { "id": "uuid", "title": "My Post", "content": "Content here", "tags": ["tag1"], "author": { "id": "uuid", "name": "John Doe" }, "likes": 5, "comments": [ { "id": "uuid", "content": "Nice post!", "author": { "id": "uuid", "name": "Jane Doe" } } ] } }` |
| `/api/posts/user/:userId` | GET    | Get all posts by a specific user                                               | URL param: `userId`               | Yes           | Header: `Authorization: Bearer <token>`                                                        | `{ "message": "User posts fetched", "data": [ { "id": "uuid", "title": "My Post" } ] }`                                                                                                                                                                                                           |
| `/api/posts/`             | POST   | Create a new post                                                              | `{ title, content, tags, image }` | Yes           | `{ "title": "New Post", "content": "Content here", "tags": ["tech"], "image": "https://..." }` | `{ "message": "Post created", "data": { "id": "uuid", "title": "New Post" } }`                                                                                                                                                                                                                    |
| `/api/posts/:id`          | PUT    | Update an existing post                                                        | `{ title, content, tags, image }` | Yes           | `{ "title": "Updated Post", "content": "Updated content" }`                                    | `{ "message": "Post updated", "data": { "id": "uuid", "title": "Updated Post" } }`                                                                                                                                                                                                                |
| `/api/posts/:id`          | DELETE | Delete a post                                                                  | URL param: `id`                   | Yes           | Header: `Authorization: Bearer <token>`                                                        | `{ "message": "Post deleted", "data": {} }`                                                                                                                                                                                                                                                       |
| `/api/posts/:id/like`     | POST   | Like or unlike a post. Returns updated like count                              | URL param: `id`                   | Yes           | Header: `Authorization: Bearer <token>`                                                        | `{ "message": "Post liked/unliked", "data": { "id": "uuid", "likes": 6 } }`                                                                                                                                                                                                                       |
| `/api/posts/:id/comment`  | POST   | Add a comment to a post                                                        | `{ content }`                     | Yes           | `{ "content": "Great post!" }`                                                                 | `{ "message": "Comment added", "data": { "id": "uuid", "content": "Great post!", "author": { "id": "uuid", "name": "John Doe" } } }`                                                                                                                                                              |
| `/api/posts/upload`       | POST   | Upload an image for a post. Max size: 5MB. Allowed types: jpeg, png, gif, webp | Form-data: `image`                | Yes           | Form-data with `image` field                                                                   | `{ "message": "Image uploaded", "data": { "url": "https://..." } }`                                                                                                                                                                                                                               |

### Response Format

All API responses follow this format:

**Success Response:**
```json
{
  "message": "Success message",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "message": "Error description",
  "error": "Detailed error information"
}
```

### Status Codes

| Code | Meaning               |
| ---- | --------------------- |
| 200  | Success               |
| 201  | Created               |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Not Found             |
| 500  | Internal Server Error |


## 🚀 Deployment

### Frontend (Render)
1. Build the project: `npm run build`
2. Deploy the `build` folder to your hosting service
3. Set environment variables in your hosting dashboard

### Backend (Render)
1. Set up your database connection
2. Deploy the backend code
3. Update frontend API URLs to point to production backend



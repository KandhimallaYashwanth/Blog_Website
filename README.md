# BlogSphere - Full-Stack Blog Application

A modern, feature-rich blog application built with React, Node.js, and Supabase. BlogSphere allows users to create, read, update, and delete blog posts with advanced features like authentication, real-time interactions, and a beautiful user interface.

## 🚀 Project Overview

BlogSphere is a comprehensive blog platform that demonstrates modern web development practices with a focus on user experience, security, and scalability.

### Key Features

- **User Authentication & Authorization**
  - JWT-based authentication with Supabase Auth
  - Google OAuth integration
  - Protected routes and secure API endpoints
  - Automatic token refresh and session management

- **Blog Management**
  - Create, read, update, and delete posts
  - Rich text content with image uploads
  - Tag system for content organization
  - Post search functionality

- **Social Features**
  - Like posts with real-time count updates
  - Comment system with nested replies
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
- React Hot Toast for notifications

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

**POST /api/auth/register**
- Register a new user account
- Body: `{ email, password, name }`
- Returns: User data and JWT token

**POST /api/auth/login**
- Login with email and password
- Body: `{ email, password }`
- Returns: User data and JWT token

**POST /api/auth/google**
- Login with Google OAuth
- Body: `{ id_token }`
- Returns: User data and JWT token

**GET /api/auth/profile**
- Get current user profile
- Headers: `Authorization: Bearer <token>`
- Returns: User profile data

**PUT /api/auth/profile**
- Update user profile
- Headers: `Authorization: Bearer <token>`
- Body: `{ name, bio, profile_picture }`
- Returns: Updated profile data

### Posts Endpoints

**GET /api/posts**
- Get all published posts
- Returns: Array of posts with author info

**GET /api/posts/:id**
- Get single post by ID
- Returns: Post details with comments and author info
- Automatically increments view count

**POST /api/posts**
- Create a new post
- Headers: `Authorization: Bearer <token>`
- Body: `{ title, content, tags, image }`
- Returns: Created post data

**PUT /api/posts/:id**
- Update existing post
- Headers: `Authorization: Bearer <token>`
- Body: `{ title, content, tags, image }`
- Returns: Updated post data

**DELETE /api/posts/:id**
- Delete a post
- Headers: `Authorization: Bearer <token>`
- Returns: Success message

**GET /api/posts/user/:userId**
- Get posts by specific user
- Headers: `Authorization: Bearer <token>`
- Returns: Array of user's posts

**POST /api/posts/:id/like**
- Like or unlike a post
- Headers: `Authorization: Bearer <token>`
- Returns: Updated like count

**POST /api/posts/:id/comments**
- Add comment to a post
- Headers: `Authorization: Bearer <token>`
- Body: `{ content }`
- Returns: New comment data

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

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error


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
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
PORT=5000
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


### Prompting Techniques Used

#### 1. **Structured Problem Definition**
```
"I am facing these errors in my React blog app with a Postgres backend:
- 'invalid input syntax for type uuid: 'undefined''
- 'Invalid or expired token'
- 403 Forbidden and 500 Internal Server Errors

Please resolve these issues by:
1. Fixing the frontend code where user UUID is missing...
2. Correctly retrieving authenticated user's UUID...
3. Adding logic to detect expired JWT tokens..."
```

**Why it worked:** By providing specific error messages, context about the tech stack, and a numbered list of requirements, the AI could understand the exact problem and provide targeted solutions.

#### 2. **Iterative Debugging Approach**
```
"got same error 'column reference 'id' is ambiguous'"
```

**Why it worked:** Each iteration built on the previous solution, allowing the AI to refine its approach and provide increasingly specific fixes.

#### 3. **Feature Enhancement Requests**
```
"Please update the UI of the post detail and comment section to make it visually appealing:
- Use a modern card style with rounded corners...
- Increase the size and weight of the post title..."
```

**Why it worked:** Detailed, visual requirements with specific UI elements helped the AI understand the desired outcome and generate appropriate CSS/JSX code.

#### 4. **Code Review and Optimization**
```
"Fix the like button, which is returning a 500 error. Debug both backend and frontend..."
```

**Why it worked:** By asking for both backend and frontend debugging, the AI could provide a comprehensive solution that addressed the entire request flow.

### Challenges Faced & Solutions

#### 1. **SQL Column Ambiguity**
**Challenge:** "column reference 'id' is ambiguous" errors in complex queries with joins.

**Solution:** Systematically qualified all column references with table aliases:
```sql
-- Before
SELECT id, title FROM posts p JOIN users u ON p.author_id = u.id

-- After  
SELECT p.id, p.title FROM posts p JOIN users u ON p.author_id = u.id
```

#### 2. **React Strict Mode Double Rendering**
**Challenge:** Views were incrementing by 2 due to useEffect running twice in development.

**Solution:** Implemented useRef to track fetch state:
```javascript
const fetchedRef = React.useRef(false);
useEffect(() => {
  if (id && !fetchedRef.current) {
    dispatch(fetchPost(id));
    fetchedRef.current = true;
  }
}, [dispatch, id]);
```

#### 3. **JWT Token Management**
**Challenge:** Malformed tokens causing authentication failures.

**Solution:** Added client-side token validation and automatic session refresh:
```javascript
const getValidToken = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session && isTokenExpired(session.access_token)) {
    const { data } = await supabase.auth.refreshSession();
    return data.session?.access_token;
  }
  return session?.access_token;
};
```

#### 4. **State Synchronization**
**Challenge:** UI not reflecting backend changes immediately.

**Solution:** Implemented optimistic updates and proper Redux state management:
```javascript
.addCase(addComment.fulfilled, (state, action) => {
  if (state.currentPost && state.currentPost.id === action.payload.post_id) {
    state.currentPost.comments.push(action.payload);
  }
})
```

#### 5. **Responsive Design Complexity**
**Challenge:** Creating consistent, mobile-first responsive layouts.

**Solution:** Used CSS Grid and Flexbox with systematic breakpoints:
```scss
.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
```

### Key Learnings

1. **Iterative Development:** AI excels when you provide specific, actionable feedback and build upon previous solutions.

2. **Context Matters:** Including error messages, code snippets, and specific requirements dramatically improves AI response quality.

3. **Full-Stack Thinking:** AI can help coordinate frontend and backend changes when you explicitly ask for both perspectives.

4. **Modern Patterns:** AI is excellent at implementing current best practices (React hooks, Redux Toolkit, modern CSS).

5. **Debugging Efficiency:** AI can quickly identify common patterns in errors and provide targeted fixes.

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `build` folder to your hosting service
3. Set environment variables in your hosting dashboard

### Backend (Railway/Heroku)
1. Set up your database connection
2. Deploy the backend code
3. Update frontend API URLs to point to production backend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with the assistance of AI tools for rapid prototyping and problem-solving
- Inspired by modern blog platforms and social media applications
- Uses Supabase for backend-as-a-service functionality

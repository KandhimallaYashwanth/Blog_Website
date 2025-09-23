# BlogSphere - Full-Stack Blog Application

A modern, feature-rich blog application built with React, Node.js, and Supabase. BlogSphere allows users to create, read, update, and delete blog posts with advanced features like authentication, real-time interactions, and a beautiful user interface.

## 🚀 Project Overview

BlogSphere is a comprehensive blog platform that demonstrates modern web development practices with a focus on user experience, security, and scalability.

## Demo

Check out the live version of BlogSphere:

[Live Website](https://blogsphere-2s7e.onrender.com/)

Or watch the demo video:

[Demo Video](https://drive.google.com/file/d/1QDP3e7vgGc4cyJYNT-_MgHtm4f8izfwg/view?usp=sharing)

This demo shows how users can **sign up, log in, and perform CRUD operations** seamlessly. You can see the **interactive UI** and **real-time updates** in action.


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
Mitt_Arv_Assignment/
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


## 🤖 AI Tools Used  

I developed the project independently, handling all core logic, architecture, and integrations.  
AI tools were used **selectively to assist, optimize, and speed up certain tasks**, not to replace manual work.  

**AI Tools leveraged:**  
- **Cursor** – for code optimization and improving performance  
- **ChatGPT & Perplexity** – for assistance in solving errors, suggesting fixes, and refining my prompts  
- **Copilot** – for boilerplate code and repetitive tasks
  
**Important:** AI was only used to suggest optimizations, explain complex issues, and provide guidance. All suggestions were critically evaluated and fully integrated by me—no full projects were copied, and I maintained full control over the code.

### Where AI Helped:

- ⚛️ **Frontend Components & Styling:** Generated React component boilerplate and SCSS templates, which I refined and integrated manually  
- 🔗 **Backend APIs:** Suggested endpoint structures, validations, and error handling patterns, customized for production use  
- 🗄️ **Database Design:** Drafted PostgreSQL schema, RPC functions, and triggers with AI guidance, later optimized by me  
- 📦 **State Management:** Assisted with Redux slices and async thunks; I ensured proper data flow and implemented optimistic UI updates  
- 🛠️ **Debugging & Optimization:** I understood all errors myself, but used ChatGPT and Perplexity to **suggest solutions, verify approaches, and refine prompts** for accurate fixes  


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

### Summary

AI assisted in **understanding complex problems, suggesting optimizations, and guiding development**, while I independently managed **all feature implementation, debugging, and production-ready decisions**.  
This demonstrates **effective AI-assisted development**, highlighting both technical expertise and responsible AI usage.

## 🌟 Bonus Features & Current Status


| Feature                       | Status                                                                                                                                       |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------  |
| SEO compliant                 | ✅ Partially Implemented – Basic HTML structure, DOCTYPE, meta charset & viewport, meta description, favicon, manifest.json, font preloading |
| Search blogs by title or tags | ✅ Implemented                                                                                                                               |
| Like/Bookmark posts           | ✅ Like functionality implemented (Bookmark coming soon)                                                                                     |
| Comment system (basic)        | ✅ Implemented                                                                                                                               |
| Pagination / Infinite scroll  | ⚠️ Not implemented                                                                                                                           |
| Rich text editor for posts    | ⚠️ Not implemented                                                                                                                           |
| AI content suggestions        | ⚠️ Not implemented                                                                                                                           |


## 🛠️ Expected Deliverables

| Deliverable                                              | Status      |
| -------------------------------------------------------- | ----------  |
| Codebase hosted on GitHub (well-structured with README)  | ✅ Done     |
| Working web interface                                    | ✅ Done     |
| Working web app (video demo)                             | ✅ Done     |
| Working mobile app (screenshots/video demo)              | ❌ Not done |
| REST API backend                                         | ✅ Done     |
| Clear setup instructions for local development           | ✅ Done     |
| Description of when and where AI was used in development | ✅ Done     |


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
AI Assistance: I understood the error myself, but used ChatGPT/Perplexity to suggest best practices and optimize the query structure

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
AI Assistance: AI suggested potential causes for the double rendering; I implemented the final solution independently.

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
AI Assistance: ChatGPT/Perplexity helped brainstorm approaches for token refresh, while I implemented the production-ready logic.

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
AI Assistance: AI suggested techniques for optimistic updates; I ensured correct state flow and implemented them.

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
AI Assistance: AI suggested responsive grid patterns; I customized them to match the app's design requirements.

### Key Learnings

1. **Iterative Development:** AI excels when you provide specific, actionable feedback and build upon previous solutions.

2. **Context Matters:** Including error messages, code snippets, and specific requirements dramatically improves AI response quality.

3. **Full-Stack Thinking:** AI can help coordinate frontend and backend changes when you explicitly ask for both perspectives.

4. **Modern Patterns:** AI is excellent at implementing current best practices (React hooks, Redux Toolkit, modern CSS).

5. **Debugging Efficiency:** AI can quickly identify common patterns in errors and provide targeted fixes.

## 🚀 Deployment

### Frontend (Render)
1. Build the project: `npm run build`
2. Deploy the `build` folder to your hosting service
3. Set environment variables in your hosting dashboard

### Backend (Render)
1. Set up your database connection
2. Deploy the backend code
3. Update frontend API URLs to point to production backend



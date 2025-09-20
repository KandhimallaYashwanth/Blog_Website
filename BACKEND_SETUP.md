# 🚀 BlogSphere Backend Setup Guide

## ✅ **Complete Backend Architecture**

Your backend is now properly separated and ready for shared use with both web and mobile apps!

### 📁 **Backend Structure:**
```
backend/
├── src/
│   ├── config/
│   │   └── supabase.js          # Supabase configuration
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   └── postController.js    # Posts CRUD logic
│   ├── middleware/
│   │   ├── authMiddleware.js    # JWT authentication
│   │   └── uploadMiddleware.js  # File upload handling
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   └── postRoutes.js        # Posts endpoints
│   └── server.js                # Main server file
├── package.json                 # Dependencies
├── setup.js                     # Setup script
└── env.example                  # Environment template
```

## 🛠️ **Setup Instructions:**

### **Step 1: Install Backend Dependencies**
```bash
cd backend
npm install
```

### **Step 2: Set Up Environment**
```bash
npm run setup
```

### **Step 3: Configure Supabase**
1. **Create Supabase project** at [supabase.com](https://supabase.com)
2. **Run SQL schema** from `web/supabase-schema.sql` in Supabase SQL Editor
3. **Get credentials** from Settings → API
4. **Update `.env` file:**
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   JWT_SECRET=your-super-secret-jwt-key
   ```

### **Step 4: Start Backend Server**
```bash
npm run dev
```

## 🔌 **API Endpoints:**

### **Authentication:**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/google` - Google OAuth
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/logout` - Logout

### **Posts:**
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create post (auth required)
- `PUT /api/posts/:id` - Update post (auth required)
- `DELETE /api/posts/:id` - Delete post (auth required)
- `GET /api/posts/user/:userId` - Get user's posts
- `POST /api/posts/upload` - Upload image (auth required)

## 🔒 **Security Features:**

- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **Rate Limiting** - Prevent abuse
- ✅ **CORS Protection** - Configured origins
- ✅ **Helmet Security** - Security headers
- ✅ **File Upload Validation** - Image type/size limits
- ✅ **Row Level Security** - Database-level permissions

## 📱 **Mobile App Ready:**

Your backend is designed for shared use:
- ✅ **RESTful API** - Standard HTTP endpoints
- ✅ **JSON Responses** - Easy to parse
- ✅ **CORS Configured** - Works with mobile apps
- ✅ **Authentication** - JWT tokens
- ✅ **File Upload** - Image handling
- ✅ **Error Handling** - Consistent error responses

## 🎯 **Frontend Integration:**

### **Update Frontend Environment:**
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_USE_MOCK_API=false
```

### **Frontend Now Uses:**
- ✅ **Backend API** instead of direct Supabase
- ✅ **Proper error handling** with backend messages
- ✅ **JWT tokens** for authentication
- ✅ **File upload** through backend
- ✅ **Consistent data format** across web and mobile

## 🚀 **Benefits:**

1. **Shared Backend** - Same API for web and mobile
2. **Scalable Architecture** - Proper separation of concerns
3. **Security** - Centralized authentication and validation
4. **Maintainability** - Single source of truth for business logic
5. **Performance** - Optimized database queries
6. **Monitoring** - Centralized logging and error handling

## 🔄 **Development Workflow:**

1. **Backend Development:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Frontend Development:**
   ```bash
   cd web
   npm start
   ```

3. **API Testing:**
   - Backend: `http://localhost:5000`
   - Frontend: `http://localhost:3000`

## 📊 **Database Schema:**

Your Supabase database includes:
- `profiles` - User profiles (extends auth.users)
- `posts` - Blog posts with author relationships
- `comments` - Post comments (ready for future use)
- `blog-images` - File storage bucket

## 🎉 **Ready for Production:**

Your backend is production-ready with:
- ✅ **Environment configuration**
- ✅ **Error handling**
- ✅ **Security middleware**
- ✅ **Database integration**
- ✅ **File upload support**
- ✅ **Authentication system**

**Start building your mobile app using the same API endpoints!** 📱🚀


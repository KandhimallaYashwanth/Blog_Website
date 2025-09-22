# 🚀 BlogSphere – Complete Setup Guide  

This guide will help you set up **BlogSphere** (Frontend + Backend + Supabase) on your local machine.  

---
## Prerequisites

- Node.js (v16 or higher)
- npm 
- Supabase account
- Git

---

## ⚙️ 1. Clone Repository  

```bash
git clone <repository-url>
cd Mitt_Arv_Assignment
```

## 🗄️ 2. Database Setup (Supabase)

1. **Create a Supabase project** → [supabase.com](https://supabase.com)

2. **Run the schema:**
   - Go to your Supabase Dashboard  
   - Open **SQL Editor**  
   - Paste the contents of `backend/supabase-schema.sql`  
   - Run the query to create tables, functions, and triggers  

3. **Get your credentials:**
   - Go to **Settings → API**  
   - Copy the following values:  
     - **Project URL**  
     - **anon public key**  
     - **service_role key**  

## 🔧3. Backend Setup
- cd backend
- npm install

### Configure .env in backend/
- Create a `.env` file in the backend directory:

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
### Start the backend server:

```bash
npm install
npm start
```
### Expected output

- 🚀 BlogSphere Backend running on http://localhost:5000
- 📊 Environment: development

## 4.Frontend Setup

```bash
cd web
npm install
```

- Create a `.env` file in the web directory:

```env
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
REACT_APP_API_URL=http://localhost:5000/api
```

### Start the frontend development server:

```bash
npm start
```
#### Expected output:
```bash
webpack compiled successfully!
Local:   http://localhost:3000
```

## 🔍5. Health Checks
- Backend
```bash
curl http://localhost:5000
```
- Should return:
```bash
{"message":"BlogSphere Backend API 🚀","version":"1.0.0","status":"healthy"}
```
- API
```bash
curl http://localhost:5000/api/posts
```

## Frontend

- Visit http://localhost:3000 in your browser.
- You should see the BlogSphere homepage.

## 🛠️ Troubleshooting

### Backend 500 errors:

- Check .env Supabase credentials
- Ensure SQL schema was applied
- Verify backend is running

### Frontend API errors:

- Confirm REACT_APP_API_URL=http://localhost:5000/api in web/.env

- Start backend before frontend

### Database issues:

- Ensure RLS policies are enabled
- Check that required storage buckets exist

### 🎯 Final Checklist

- ✅ Supabase schema created 

- ✅ .env files configured (backend + frontend)

- ✅ Backend running on port 5000

- ✅ Frontend running on port 3000

- ✅ Able to sign up, log in, and create posts







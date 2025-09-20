# BlogSphere Frontend

A modern React frontend for BlogSphere - a beautiful blog platform built with Redux Toolkit, React Router, and SCSS.

## Features

- **Authentication**: Email/password and Google OAuth login
- **Blog Posts**: Create, read, update, and delete blog posts
- **User Profiles**: View and edit user profiles
- **Responsive Design**: Mobile-first responsive layout
- **Modern UI**: Clean, minimal design with smooth animations

## Tech Stack

- React 18
- Redux Toolkit for state management
- React Router for navigation
- SCSS for styling
- Axios for API calls
- React Hook Form for form handling
- React Hot Toast for notifications
- Date-fns for date formatting

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the web directory:
   ```bash
   cd web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment variables:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your configuration:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id-here
   ```

### Running the Application

```bash
npm start
```

The application will start on `http://localhost:3000`.

### Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Layout/         # Layout components
│   ├── PostCard/       # Post card component
│   ├── ProtectedRoute/ # Route protection
│   └── LoadingSpinner/ # Loading component
├── pages/              # Page components
│   ├── Home.js         # Home page
│   ├── Login.js        # Login page
│   ├── Signup.js       # Signup page
│   ├── PostDetail.js   # Post detail page
│   ├── CreatePost.js   # Create post page
│   ├── EditPost.js     # Edit post page
│   └── Profile.js      # Profile page
├── store/              # Redux store
│   ├── store.js        # Store configuration
│   └── slices/         # Redux slices
│       ├── authSlice.js
│       ├── postsSlice.js
│       └── uiSlice.js
├── services/           # API services
│   └── api.js          # Axios configuration
├── styles/             # Global styles
│   └── globals.scss    # Global SCSS variables and mixins
└── config/             # Configuration
    └── env.js          # Environment configuration
```

## API Integration

The frontend is configured to work with the backend API. Make sure your backend server is running on the configured URL.

### Authentication

- Login with email/password
- Google OAuth integration
- JWT token storage in Redux and localStorage
- Protected routes for authenticated users

### Blog Posts

- Fetch all posts on home page
- Create new posts (authenticated users only)
- Edit/delete own posts
- View individual post details
- Image upload support

### User Profile

- View user profile information
- Edit profile details
- View user's posts
- Profile picture upload

## Styling

The application uses SCSS with a design system approach:

- CSS custom properties for theming
- Responsive design with mobile-first approach
- Consistent spacing and typography
- Smooth animations and transitions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## About BlogSphere

BlogSphere is a modern, beautiful blog platform designed for writers, creators, and communities to share their stories with the world. Built with cutting-edge technologies and a focus on user experience.

## License

This project is licensed under the MIT License.


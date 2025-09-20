#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Create .env file if it doesn't exist
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, '.env.example');

if (!fs.existsSync(envPath)) {
  const envContent = `# Backend API Configuration
REACT_APP_API_URL=http://localhost:5000/api

# Google OAuth (optional)
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id

# Use Mock API (set to true if backend is not running)
REACT_APP_USE_MOCK_API=false`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env file');
} else {
  console.log('✅ .env file already exists');
}

console.log('🎉 BlogSphere Frontend setup complete!');
console.log('📝 Please update the .env file with your Google OAuth client ID');
console.log('🚀 Make sure your backend is running on http://localhost:5000');
console.log('🚀 Run "npm start" to start the development server');


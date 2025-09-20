// Environment configuration
export const config = {
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  GOOGLE_CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID || 'your-google-client-id-here',
  USE_MOCK_API: process.env.REACT_APP_USE_MOCK_API === 'true',
  USE_BACKEND_API: process.env.REACT_APP_USE_MOCK_API !== 'true',
};


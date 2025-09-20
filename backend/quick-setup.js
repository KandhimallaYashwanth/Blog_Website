#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a temporary .env file for testing
const envPath = path.join(__dirname, '.env');

const envContent = `# Server Configuration
PORT=5000
NODE_ENV=development

# Supabase Configuration (REPLACE WITH YOUR ACTUAL VALUES)
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-12345
JWT_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# File Upload Configuration
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,image/webp`;

fs.writeFileSync(envPath, envContent);

console.log('🔧 Backend .env file created!');
console.log('');
console.log('⚠️  IMPORTANT: You need to configure Supabase:');
console.log('');
console.log('1. Go to https://supabase.com and create a new project');
console.log('2. Run the SQL schema from backend/supabase-schema.sql');
console.log('3. Get your credentials from Settings → API');
console.log('4. Update the .env file with your actual Supabase credentials');
console.log('');
console.log('🚀 Then run: npm run dev');


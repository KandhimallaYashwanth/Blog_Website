#!/usr/bin/env node

import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config();

console.log('🔍 Testing Backend Configuration...\n');

// Check environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('📋 Environment Variables:');
console.log(`SUPABASE_URL: ${supabaseUrl ? '✅ Set' : '❌ Missing'}`);
console.log(`SUPABASE_ANON_KEY: ${supabaseAnonKey ? '✅ Set' : '❌ Missing'}`);
console.log(`SUPABASE_SERVICE_KEY: ${supabaseServiceKey ? '✅ Set' : '❌ Missing'}`);
console.log(`JWT_SECRET: ${process.env.JWT_SECRET ? '✅ Set' : '❌ Missing'}`);
console.log(`PORT: ${process.env.PORT || '5000'}`);
console.log('');

if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
  console.log('❌ Missing Supabase credentials!');
  console.log('📝 Please update your .env file with actual Supabase values');
  console.log('📖 See FIX_API_KEY_ERROR.md for detailed instructions');
  process.exit(1);
}

// Test Supabase connection
console.log('🔌 Testing Supabase Connection...');

try {
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  // Test connection by querying profiles table
  const { data, error } = await supabase
    .from('profiles')
    .select('count')
    .limit(1);

  if (error) {
    console.log('❌ Supabase connection failed:');
    console.log(`   Error: ${error.message}`);
    console.log('');
    console.log('🔧 Possible solutions:');
    console.log('   1. Check if your Supabase URL is correct');
    console.log('   2. Check if your API keys are correct');
    console.log('   3. Make sure you ran the SQL schema in Supabase');
    console.log('   4. Verify the profiles table exists');
  } else {
    console.log('✅ Supabase connection successful!');
    console.log('✅ Database schema is properly configured');
  }
} catch (err) {
  console.log('❌ Connection test failed:');
  console.log(`   Error: ${err.message}`);
}

console.log('');
console.log('🚀 Configuration test complete!');


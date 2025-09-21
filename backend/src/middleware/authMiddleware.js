import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabase.js';

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ message: 'Authentication required: No token provided' });
    }

    // Verify token with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error) {
      console.error('Supabase auth.getUser error:', error.message);
      // Changed status from 403 to 401 for authentication failures, including expired tokens
      return res.status(401).json({ message: `Authentication failed: ${error.message}` });
    }

    if (!user) {
      return res.status(403).json({ message: 'Authentication failed: Invalid or expired token' });
    }

    // Get user profile
    let { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.warn('Auth middleware: User profile not found for ID', user.id, 'Attempting to create basic profile.', profileError.message);
      // If profile not found, create a basic one
      const { data: newProfile, error: newProfileError } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          name: user.user_metadata?.name || user.email, // Use name from metadata or email
          email: user.email,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (newProfileError || !newProfile) {
        console.error('Auth middleware: Failed to create new profile for user ID', user.id, newProfileError);
        return res.status(500).json({ message: 'Failed to create user profile after authentication.' });
      }
      profile = newProfile; // Use the newly created profile
    }

    req.user = {
      id: user.id,
      email: user.email,
      ...profile
    };

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ message: 'Authentication error' });
  }
};

export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const { data: { user }, error } = await supabase.auth.getUser(token);

      if (error) {
        console.error('Supabase optionalAuth auth.getUser error:', error.message);
        // Continue without user if token is invalid/expired in optional auth
        return next();
      }

      if (!user) {
        // If token exists but no user is found, it's an invalid token; continue without user
        return next();
      }

      if (!error && user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profile) {
          req.user = {
            id: user.id,
            email: user.email,
            ...profile
          };
        }
      }
    }

    next();
  } catch (error) {
    console.error('Optional auth middleware error:', error);
    next(); // Continue without user
  }
};
import { supabase } from '../config/supabase.js';

// Register new user
export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    console.log('Registration attempt:', { email, name });

    if (!email || !password || !name) {
      return res.status(400).json({ 
        message: 'Email, password, and name are required' 
      });
    }

    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: {
        name: name
      },
      email_confirm: true // Auto-confirm email for development
    });

    if (error) {
      console.error('Supabase registration error:', error);
      return res.status(400).json({ 
        message: error.message || 'Database error creating new user' 
      });
    }

    if (!data.user || !data.user.id) {
      console.error('Registration: Supabase returned no user or user ID.', data);
      return res.status(500).json({
        message: 'Failed to retrieve user ID after registration.'
      });
    }

    // Create user profile in profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: data.user.id,
        name: name,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (profileError) {
      console.error('Profile creation error:', profileError);
      // Don't fail registration if profile creation fails
    }

    // Generate a simple token for frontend
    const token = data.session?.access_token || 'mock-token-' + Date.now();

  res.status(201).json({
      message: 'User created successfully',
      token: token,
      user: {
        id: data.user.id,
        email: data.user.email,
        name: name,
        profile_picture: null,
        bio: null
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'Database error creating new user' 
    });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Login attempt:', { email });

    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Email and password are required' 
      });
    }

    // Authenticate with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('Supabase login error:', error);
      return res.status(401).json({ 
        message: error.message || 'Invalid credentials' 
      });
    }

    if (!data.user || !data.user.id || !data.session) {
      return res.status(401).json({
        message: 'Invalid credentials or missing session data.'
      });
    }

    // Get user profile
    const { data: profile, error: profileFetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();
    
    if (profileFetchError || !profile) {
      console.error('Login: Failed to fetch user profile for user ID:', data.user.id, profileFetchError);
      return res.status(500).json({
        message: 'Failed to retrieve user profile after login.'
      });
    }

    res.json({
      message: 'Login successful',
      token: data.session.access_token,
      user: {
        id: data.user.id,
        email: data.user.email,
        name: profile.name || data.user.user_metadata?.name || 'User',
        profile_picture: profile.profile_picture || null,
        bio: profile.bio || null
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Internal server error' 
    });
  }
};

// Google OAuth
export const googleAuth = async (req, res) => {
  try {
    const { tokenId, profileObj } = req.body;

    if (!profileObj) {
      return res.status(400).json({ 
        message: 'Google authentication data is required' 
      });
    }

    // Create or get user
    const { data, error } = await supabase.auth.admin.createUser({
      email: profileObj.email,
      user_metadata: {
        name: profileObj.name,
        picture: profileObj.picture,
        google_id: profileObj.googleId
      },
      email_confirm: true
    });

    if (error && !error.message.includes('already registered')) {
      console.error('Google auth error:', error);
      return res.status(400).json({
        message: error.message || 'Google authentication failed'
      });
    }

    // Ensure user data from Supabase is available
    if (!data?.user?.id) {
      // If user is already registered, supabase.auth.admin.createUser might not return user data
      // Attempt to sign in to get the session and user data for existing users
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: profileObj.email,
        password: process.env.GOOGLE_AUTH_DUMMY_PASSWORD || 'default_dummy_password' // Use a dummy password or handle differently
      });

      if (signInError || !signInData?.user?.id) {
        console.error('Google auth: Failed to get user ID after create/signin', signInError);
        return res.status(500).json({ message: 'Failed to retrieve user ID for Google authentication.' });
      }
      data.user = signInData.user;
      data.session = signInData.session;
    }

    // Create or update profile
    const { data: profile, error: profileUpsertError } = await supabase
      .from('profiles')
      .upsert({
        id: data.user.id,
        name: profileObj.name,
        email: profileObj.email,
        profile_picture: profileObj.picture,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (profileUpsertError || !profile) {
      console.error('Google auth: Failed to upsert profile', profileUpsertError);
      return res.status(500).json({ message: 'Failed to create or update Google profile.' });
    }

    res.json({
      message: 'Google authentication successful',
      token: data.session?.access_token || 'mock-token-' + Date.now(),
      user: {
        id: data.user.id,
        email: profileObj.email,
        name: profileObj.name,
        profile_picture: profileObj.picture,
        bio: profile.bio || ''
      }
    });

  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ 
      message: 'Internal server error' 
    });
  }
};

// Get current user profile
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      return res.status(404).json({ 
        message: 'Profile not found' 
      });
    }

    res.json({
      user: {
        id: profile.id,
        email: req.user.email,
        name: profile.name,
        profile_picture: profile.profile_picture,
        bio: profile.bio
      }
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ 
      message: 'Internal server error' 
    });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, bio, profile_picture } = req.body;

    const { data: profile, error } = await supabase
      .from('profiles')
      .update({
        name,
        bio,
        profile_picture,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ 
        message: error.message || 'Failed to update profile' 
      });
    }

  res.json({
      message: 'Profile updated successfully',
      user: {
        id: profile.id,
        email: req.user.email,
        name: profile.name,
        profile_picture: profile.profile_picture,
        bio: profile.bio
      }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ 
      message: 'Internal server error' 
    });
  }
};

// Logout
export const logout = async (req, res) => {
  try {
    res.json({ 
      message: 'Logout successful' 
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ 
      message: 'Internal server error' 
    });
  }
};
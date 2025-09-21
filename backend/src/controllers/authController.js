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

    // After creating the user, sign them in to get a session and access token
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      console.error('Supabase post-registration sign-in error:', signInError);
      // Even if sign-in fails, the user is created, but we can't provide a session
      return res.status(500).json({ message: signInError.message || 'Failed to sign in user after registration.' });
    }

    if (!signInData.session || !signInData.user) {
      console.error('Supabase post-registration sign-in: No session or user data.', signInData);
      return res.status(500).json({ message: 'Failed to retrieve session data after registration.' });
    }

    // Create user profile in profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: signInData.user.id,
        name: name,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (profileError) {
      console.error('Profile creation error:', profileError);
      // Don't fail registration if profile creation fails, but log it
    }

    // Use the access token from the sign-in data
    const token = signInData.session.access_token;

    res.status(201).json({
      message: 'User created successfully',
      token: token,
      user: {
        id: signInData.user.id,
        email: signInData.user.email,
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
    const { id_token } = req.body; // Expecting id_token from frontend

    if (!id_token) {
      return res.status(400).json({
        message: 'Google ID token is required'
      });
    }

    // Use Supabase client to sign in with ID token
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: id_token,
    });

    if (error) {
      console.error('Supabase Google sign-in error:', error);
      return res.status(400).json({
        message: error.message || 'Google authentication failed'
      });
    }

    if (!data.session || !data.user) {
      console.error('Google auth: Supabase returned no session or user data.', data);
      return res.status(500).json({ message: 'Failed to retrieve session or user data from Supabase.' });
    }

    // Fetch or create profile if it doesn't exist
    let { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profileError && profileError.code === 'PGRST116') { // PGRST116 means no rows found
      // Profile doesn't exist, create it
      const { data: newProfile, error: createProfileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          name: data.user.user_metadata?.name || data.user.email,
          profile_picture: data.user.user_metadata?.picture || null,
          email: data.user.email, // Add email to profile for consistency
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (createProfileError) {
        console.error('Google auth: Failed to create profile for new user', createProfileError);
        // Proceed without profile, but log error
      }
      profile = newProfile;
    } else if (profileError) {
      console.error('Google auth: Failed to fetch profile', profileError);
      return res.status(500).json({ message: 'Failed to retrieve user profile.' });
    }
    
    res.json({
      message: 'Google authentication successful',
      token: data.session.access_token,
      user: {
        id: data.user.id,
        email: data.user.email,
        name: profile?.name || data.user.user_metadata?.name || 'User',
        profile_picture: profile?.profile_picture || data.user.user_metadata?.picture || null,
        bio: profile?.bio || null
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
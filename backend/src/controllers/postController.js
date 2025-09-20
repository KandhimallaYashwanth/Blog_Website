import { supabase } from '../config/supabase.js';

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const { data: posts, error } = await supabase
      .from('posts')
      .select(`
        *,
        profiles:author_id (
          id,
          name,
          profile_picture
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    res.json(posts);

  } catch (error) {
    console.error('Get all posts error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get single post
export const getPost = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: post, error } = await supabase
      .from('posts')
      .select(`
        *,
        profiles:author_id (
          id,
          name,
          profile_picture,
          bio
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);

  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create new post
export const createPost = async (req, res) => {
  try {
    const userId = req.user.id;
  const { title, content, tags, image } = req.body;

  if (!title || !content) {
      return res.status(400).json({ 
        message: 'Title and content are required' 
      });
    }

    const { data: post, error } = await supabase
      .from('posts')
      .insert({
        title,
        content,
        author_id: userId,
        tags: tags || [],
        image: image || null
      })
      .select(`
        *,
        profiles:author_id (
          id,
          name,
          profile_picture
        )
      `)
      .single();

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(201).json(post);

  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update post
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { title, content, tags, image } = req.body;

    // Check if user owns the post
    const { data: existingPost, error: checkError } = await supabase
      .from('posts')
      .select('author_id')
      .eq('id', id)
      .single();

    if (checkError) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (existingPost.author_id !== userId) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    const { data: post, error } = await supabase
      .from('posts')
      .update({
    title,
    content,
    tags: tags || [],
    image: image || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select(`
        *,
        profiles:author_id (
          id,
          name,
          profile_picture
        )
      `)
      .single();

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.json(post);

  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete post
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Check if user owns the post
    const { data: existingPost, error: checkError } = await supabase
      .from('posts')
      .select('author_id')
      .eq('id', id)
      .single();

    if (checkError) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (existingPost.author_id !== userId) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.json({ message: 'Post deleted successfully' });

  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get user's posts
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;

    const { data: posts, error } = await supabase
      .from('posts')
      .select(`
        *,
        profiles:author_id (
          id,
          name,
          profile_picture
        )
      `)
      .eq('author_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    res.json(posts);

  } catch (error) {
    console.error('Get user posts error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Upload image
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const userId = req.user.id;
    const file = req.file;
    const fileExt = file.originalname.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('blog-images')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype
      });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('blog-images')
      .getPublicUrl(fileName);

    res.json({
      message: 'Image uploaded successfully',
      imageUrl: publicUrl
    });

  } catch (error) {
    console.error('Upload image error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
-- BlogSphere Database Schema for Supabase
-- Run this in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT NOT NULL,
  bio TEXT,
  profile_picture TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create posts table
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES profiles(id) NOT NULL,
  tags TEXT[],
  image TEXT,
  likes INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_likes table to track likes by users
CREATE TABLE IF NOT EXISTS user_likes (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, post_id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create comments table (for future use)
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  author_id UUID REFERENCES profiles(id) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Policies for profiles table
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Policies for posts table
CREATE POLICY "Anyone can view posts" ON posts FOR SELECT USING (true);
CREATE POLICY "Users can create posts" ON posts FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can update own posts" ON posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Users can delete own posts" ON posts FOR DELETE USING (auth.uid() = author_id);

-- Policies for comments table
CREATE POLICY "Anyone can view comments" ON comments FOR SELECT USING (true);
CREATE POLICY "Users can create comments" ON comments FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can update own comments" ON comments FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Users can delete own comments" ON comments FOR DELETE USING (auth.uid() = author_id);

-- Policies for user_likes table
CREATE POLICY "Users can view own likes" ON user_likes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own likes" ON user_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own likes" ON user_likes FOR DELETE USING (auth.uid() = user_id);

-- Function to create profile on new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to handle liking/unliking posts
CREATE OR REPLACE FUNCTION public.increment_likes(
  post_id_param UUID,
  user_id_param UUID
)
RETURNS TABLE (id UUID, title TEXT, content TEXT, author_id UUID, tags TEXT[], image TEXT, likes INTEGER, views INTEGER, created_at TIMESTAMP WITH TIME ZONE, updated_at TIMESTAMP WITH TIME ZONE) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  _current_likes INTEGER;
  _has_liked BOOLEAN;
BEGIN
  -- Check if the user has already liked this post
  SELECT EXISTS (SELECT 1 FROM user_likes WHERE user_id = user_id_param AND post_id = post_id_param) INTO _has_liked;

  IF _has_liked THEN
    -- User has liked, so unlike (decrement likes and remove entry)
    DELETE FROM public.user_likes
    WHERE user_id = user_id_param AND post_id = post_id_param;

    UPDATE public.posts
    SET likes = likes - 1
    WHERE posts.id = post_id_param
    RETURNING posts.likes INTO _current_likes;
  ELSE
    -- User has not liked, so like (increment likes and add entry)
    INSERT INTO public.user_likes (user_id, post_id)
    VALUES (user_id_param, post_id_param);

    UPDATE public.posts
    SET likes = likes + 1
    WHERE posts.id = post_id_param
    RETURNING posts.likes INTO _current_likes;
  END IF;

  -- Return the updated post to the frontend
  RETURN QUERY SELECT 
    posts.id,
    posts.title,
    posts.content,
    posts.author_id,
    posts.tags,
    posts.image,
    posts.likes,
    posts.views,
    posts.created_at,
    posts.updated_at
  FROM public.posts
  WHERE posts.id = post_id_param;
END;
$$

-- Function to increment post views
CREATE OR REPLACE FUNCTION public.increment_views(
  post_id_param UUID
)
RETURNS TABLE (id UUID, title TEXT, content TEXT, author_id UUID, tags TEXT[], image TEXT, likes INTEGER, views INTEGER, created_at TIMESTAMP WITH TIME ZONE, updated_at TIMESTAMP WITH TIME ZONE) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.posts
  SET views = posts.views + 1
  WHERE posts.id = post_id_param;

  RETURN QUERY SELECT 
    posts.id,
    posts.title,
    posts.content,
    posts.author_id,
    posts.tags,
    posts.image,
    posts.likes,
    posts.views,
    posts.created_at,
    posts.updated_at
  FROM public.posts
  WHERE posts.id = post_id_param;
END;
$$

-- Triggers for updated_at
CREATE TRIGGER handle_updated_at_profiles
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_posts
  BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_comments
  BEFORE UPDATE ON comments
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('blog-images', 'blog-images', true);

-- Storage policies for blog-images bucket
CREATE POLICY "Anyone can view blog images" ON storage.objects 
FOR SELECT USING (bucket_id = 'blog-images');

CREATE POLICY "Authenticated users can upload blog images" ON storage.objects 
FOR INSERT WITH CHECK (
  bucket_id = 'blog-images' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Users can update own blog images" ON storage.objects 
FOR UPDATE USING (
  bucket_id = 'blog-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete own blog images" ON storage.objects 
FOR DELETE USING (
  bucket_id = 'blog-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Create indexes for better performance
CREATE INDEX idx_posts_author_id ON posts(author_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_author_id ON comments(author_id);

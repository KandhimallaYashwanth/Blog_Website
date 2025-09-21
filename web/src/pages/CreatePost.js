import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { createPost } from '../store/slices/postsSlice';
import { postsAPI } from '../services/api';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth'; // Import the useAuth hook
import './CreatePost.scss';

const CreatePost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth(); // Use the useAuth hook
  const { loading } = useSelector((state) => state.posts);
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      let imageUrl = null;
      
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        
        const uploadResponse = await postsAPI.uploadImage(formData);
        imageUrl = uploadResponse.data.imageUrl;
      }

      if (!isAuthenticated) {
        toast.error('User not authenticated. Please log in to create a post.');
        navigate('/login');
        return;
      }

      const postData = {
        ...data,
        authorId: user.id, // Corrected to user.id
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
        image: imageUrl,
      };

      dispatch(createPost(postData)).then((result) => {
        if (result.type.endsWith('fulfilled')) {
          toast.success('Post created successfully!');
          navigate(`/post/${result.payload.id}`); // Corrected to result.payload.id
        }
      });
    } catch (error) {
      toast.error('Failed to create post');
    }
  };

  return (
    <div className="create-post">
      <div className="container">
        <div className="form-container">
          <h1>Create New Post</h1>
          
          <form onSubmit={handleSubmit(onSubmit)} className="post-form">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                {...register('title', {
                  required: 'Title is required',
                  minLength: {
                    value: 5,
                    message: 'Title must be at least 5 characters'
                  }
                })}
                placeholder="Enter post title"
              />
              {errors.title && <span className="error">{errors.title.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                rows="15"
                {...register('content', {
                  required: 'Content is required',
                  minLength: {
                    value: 50,
                    message: 'Content must be at least 50 characters'
                  }
                })}
                placeholder="Write your post content here..."
              />
              {errors.content && <span className="error">{errors.content.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="tags">Tags (comma-separated)</label>
              <input
                type="text"
                id="tags"
                {...register('tags')}
                placeholder="e.g., technology, web development, react"
              />
              <small>Separate multiple tags with commas</small>
            </div>

            <div className="form-group">
              <label htmlFor="image">Featured Image (optional)</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                </div>
              )}
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                onClick={() => navigate('/')}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="submit-btn"
              >
                Create Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;

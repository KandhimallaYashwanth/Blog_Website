import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { fetchPost, updatePost, clearCurrentPost } from '../store/slices/postsSlice';
import { postsAPI } from '../services/api';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import './CreatePost.scss';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentPost, loading } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();

  useEffect(() => {
    dispatch(fetchPost(id));
    
    return () => {
      dispatch(clearCurrentPost());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (currentPost) {
      // Check if user is the author
      if (user && currentPost.author && user._id !== currentPost.author._id) {
        toast.error('You are not authorized to edit this post');
        navigate('/');
        return;
      }

      // Populate form with existing data
      reset({
        title: currentPost.title,
        content: currentPost.content,
        tags: currentPost.tags ? currentPost.tags.join(', ') : '',
      });

      if (currentPost.image) {
        setImagePreview(currentPost.image);
      }
    }
  }, [currentPost, reset, user, navigate]);

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
      let imageUrl = currentPost.image;
      
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        
        const uploadResponse = await postsAPI.uploadImage(formData);
        imageUrl = uploadResponse.data.imageUrl;
      }

      const postData = {
        ...data,
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
        image: imageUrl,
      };

      dispatch(updatePost({ postId: id, postData })).then((result) => {
        if (result.type.endsWith('fulfilled')) {
          toast.success('Post updated successfully!');
          navigate(`/post/${id}`);
        }
      });
    } catch (error) {
      toast.error('Failed to update post');
    }
  };

  if (loading && !currentPost) {
    return <LoadingSpinner />;
  }

  if (!currentPost) {
    return (
      <div className="error-container">
        <h2>Post not found</h2>
        <button onClick={() => navigate('/')} className="back-btn">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="create-post">
      <div className="container">
        <div className="form-container">
          <h1>Edit Post</h1>
          
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
              <label htmlFor="image">Featured Image</label>
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
              <small>Upload a new image to replace the current one</small>
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                onClick={() => navigate(`/post/${id}`)}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="submit-btn"
              >
                Update Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPost;

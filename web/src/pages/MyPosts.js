import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchUserPosts, deletePost } from '../store/slices/postsSlice';
import PostCard from '../components/PostCard/PostCard';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';
import './MyPosts.scss';

const MyPosts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { userPosts, loading: postsLoading } = useSelector((state) => state.posts);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('You need to be logged in to view your posts.');
      navigate('/login');
      return;
    }

    if (user && user.id) {
      dispatch(fetchUserPosts(user.id));
    } else if (isAuthenticated && !user?.id) {
      console.warn('My Posts page: Authenticated but user ID is missing. Logging out.');
      toast.error('Session data incomplete. Please log in again.');
      navigate('/login');
    }
  }, [user, dispatch, isAuthenticated, navigate]);

  const handleDeletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePost(postId)).then((result) => {
        if (result.type.endsWith('fulfilled')) {
          toast.success('Post deleted successfully!');
          if (user && user.id) {
            dispatch(fetchUserPosts(user.id)); // Refresh user posts after deletion
          }
        } else {
          toast.error(result.payload || 'Failed to delete post');
        }
      });
    }
  };

  // Remove loading spinner - show content immediately

  return (
    <div className="my-posts">
      <div className="container">
        <h1>My Posts</h1>

        {postsLoading && userPosts.length === 0 ? (
          <div className="loading-posts">
            <p>Loading your posts...</p>
          </div>
        ) : userPosts.length === 0 ? (
          <div className="no-posts">
            <p>You haven't written any posts yet.</p>
            <Link to="/create" className="create-first-btn">
              Write Your First Post
            </Link>
          </div>
        ) : (
          <div className="posts-grid">
            {userPosts.map((post) => (
              <PostCard 
                key={post.id} 
                post={post} 
                onDelete={handleDeletePost} 
                onEdit={() => navigate(`/edit/${post.id}`)} // Pass onEdit prop
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPosts;

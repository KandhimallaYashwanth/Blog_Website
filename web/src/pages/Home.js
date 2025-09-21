import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../store/slices/postsSlice';
import PostCard from '../components/PostCard/PostCard';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import './Home.scss';

const Home = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error loading posts</h2>
        <p>{error}</p>
        <button onClick={() => dispatch(fetchPosts())} className="retry-btn">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="container">
        <div className="home-header">
          <h1>Welcome to BlogSphere</h1>
          <p>Discover amazing stories and insights from our vibrant community</p>
        </div>

        {posts.length === 0 ? (
          <div className="no-posts">
            <h2>Welcome to BlogSphere!</h2>
            <p>Be the first to share your story and inspire our community</p>
            <Link to="/create" className="create-first-btn">
              Share Your First Story
            </Link>
          </div>
        ) : (
          <div className="posts-grid">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;


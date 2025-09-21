import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../store/slices/postsSlice';
import PostCard from '../components/PostCard/PostCard';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import SearchBar from '../components/SearchBar/SearchBar'; // Import SearchBar
import './Home.scss';

const Home = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredPosts = posts.filter((post) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const matchesTitle = post.title?.toLowerCase().includes(lowerCaseSearchTerm);
    const matchesAuthor = post.profiles?.name?.toLowerCase().includes(lowerCaseSearchTerm);
    const matchesTags = post.tags?.some(tag => tag.toLowerCase().includes(lowerCaseSearchTerm));
    const matchesContent = post.content?.toLowerCase().includes(lowerCaseSearchTerm);
    return matchesTitle || matchesAuthor || matchesTags || matchesContent;
  });

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

        <SearchBar onSearch={handleSearch} /> {/* Integrate SearchBar */}

        {filteredPosts.length === 0 && searchTerm ? (
          <div className="no-posts-found">
            <p>No posts found matching "{searchTerm}".</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="no-posts">
            <h2>Welcome to BlogSphere!</h2>
            <p>Be the first to share your story and inspire our community</p>
            <Link to="/create" className="create-first-btn">
              Share Your First Story
            </Link>
          </div>
        ) : (
          <div className="posts-grid">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;


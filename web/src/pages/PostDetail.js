import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost, deletePost, clearCurrentPost } from '../store/slices/postsSlice';
import { formatDistanceToNow } from 'date-fns';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import './PostDetail.scss';

const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentPost, loading, error } = useSelector((state) => state.posts);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchPost(id));
    
    return () => {
      dispatch(clearCurrentPost());
    };
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePost(id)).then(() => {
        navigate('/');
      });
    }
  };

  const formatDate = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  const isAuthor = isAuthenticated && user && currentPost && user._id === currentPost.author?._id;

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !currentPost) {
    return (
      <div className="error-container">
        <h2>Post not found</h2>
        <p>{error || 'The post you are looking for does not exist.'}</p>
        <button onClick={() => navigate('/')} className="back-btn">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="post-detail">
      <div className="container">
        <article className="post">
          {currentPost.image && (
            <div className="post-image">
              <img src={currentPost.image} alt={currentPost.title} />
            </div>
          )}
          
          <header className="post-header">
            <h1 className="post-title">{currentPost.title}</h1>
            
            <div className="post-meta">
              <div className="author-info">
                <span className="author-name">{currentPost.author?.name || 'Unknown'}</span>
                <span className="post-date">{formatDate(currentPost.createdAt)}</span>
              </div>
              
              {isAuthor && (
                <div className="post-actions">
                  <button 
                    onClick={() => navigate(`/edit/${currentPost._id}`)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={handleDelete}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            
            {currentPost.tags && currentPost.tags.length > 0 && (
              <div className="post-tags">
                {currentPost.tags.map((tag, index) => (
                  <span key={index} className="tag">#{tag}</span>
                ))}
              </div>
            )}
          </header>
          
          <div className="post-content">
            <div dangerouslySetInnerHTML={{ __html: currentPost.content.replace(/\n/g, '<br>') }} />
          </div>
        </article>
      </div>
    </div>
  );
};

export default PostDetail;


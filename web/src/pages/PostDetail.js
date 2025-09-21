import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost, deletePost, clearCurrentPost } from '../store/slices/postsSlice';
import { formatDistanceToNow } from 'date-fns';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import './PostDetail.scss';
import { likePost, addComment } from '../store/slices/postsSlice';
import { toast } from 'react-toastify';

const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentPost, loading, error } = useSelector((state) => state.posts);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [newComment, setNewComment] = useState('');
  const fetchedRef = React.useRef(false); // Add a ref to track if fetch has been made

  useEffect(() => {
    if (id && !fetchedRef.current) {
      dispatch(fetchPost(id));
      fetchedRef.current = true; // Mark as fetched
    } else if (!id) {
      toast.error('Invalid post ID provided.');
      navigate('/'); // Redirect to home or a suitable error page
    }
    
    return () => {
      dispatch(clearCurrentPost());
    };
  }, [dispatch, id, navigate]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePost(id)).then(() => {
        navigate('/');
      });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.error('Invalid date string provided to PostDetail:', dateString);
      return 'Invalid date';
    }
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const isAuthor = isAuthenticated && user && currentPost && user.id === currentPost.author?.id;

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

  const handleLike = () => {
    if (!isAuthenticated) {
      toast.error('You need to be logged in to like posts.');
      navigate('/login');
      return;
    }
    if (!currentPost || !currentPost.id) {
      toast.error('Post data is missing.');
      return;
    }
    dispatch(likePost(currentPost.id)).then((result) => {
      if (result.type.endsWith('fulfilled')) {
        toast.success('Post liked!');
      } else {
        toast.error(result.payload || 'Failed to like post');
      }
    });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('You need to be logged in to comment.');
      navigate('/login');
      return;
    }
    if (!currentPost || !currentPost.id) {
      toast.error('Post data is missing.');
      return;
    }
    if (!newComment.trim()) {
      toast.error('Comment cannot be empty.');
      return;
    }

    dispatch(addComment({ postId: currentPost.id, content: newComment })).then((result) => {
      if (result.type.endsWith('fulfilled')) {
        toast.success('Comment added!');
        setNewComment('');
      } else {
        toast.error(result.payload || 'Failed to add comment');
      }
    });
  };

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
            <h1 className="post-title">{currentPost.title || 'Untitled Post'}</h1>
            
            <div className="post-meta">
              <div className="author-info">
                <span className="author-name">By {currentPost.profiles?.name || 'Unknown Author'}</span>
                <span className="post-date">{formatDate(currentPost.created_at)}</span>
              </div>
              
              {isAuthor && (
                <div className="post-actions">
                  <button 
                    onClick={() => navigate(`/edit/${currentPost.id}`)}
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

          <div className="post-interactions">
            <div className="likes-container">
              <button 
                onClick={handleLike}
                disabled={!isAuthenticated}
                className="like-btn"
              >
                ❤️
              </button>
              <span className="like-count">{currentPost.likes} Likes</span>
              <span className="post-views">👀 {currentPost.views || 0} Views</span> {/* Display views here */}
            </div>

            <div className="comments-section">
              <h3>Comments ({currentPost.comments?.length || 0})</h3>
              {isAuthenticated ? (
                <form onSubmit={handleCommentSubmit} className="comment-form">
                  <textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                  ></textarea>
                  <button type="submit" className="submit-comment-btn">Comment</button>
                </form>
              ) : (
                <p>Please <Link to="/login">log in</Link> to comment.</p>
              )}

              <div className="comments-list">
                {currentPost.comments && currentPost.comments.length > 0 ? (
                  currentPost.comments.map((comment) => (
                    <div key={comment.id} className="comment-item">
                      <div className="comment-author">
                        <strong>{comment.profiles?.name || 'Unknown'}</strong>
                      </div>
                      <p className="comment-content">{comment.content}</p>
                    </div>
                  ))
                ) : (
                  <p>No comments yet. Be the first to comment!</p>
                )}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default PostDetail;


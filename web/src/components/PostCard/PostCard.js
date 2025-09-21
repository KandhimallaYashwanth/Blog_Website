import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import './PostCard.scss';

const PostCard = ({ post, onDelete, onEdit }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.error('Invalid date string provided:', dateString);
      return 'Invalid date';
    }
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <article className="post-card">
      {post.image && (
        <div className="post-image">
          <img src={post.image} alt={post.title} />
        </div>
      )}
      
      <div className="post-content">
        <div className="post-meta">
          <span className="author">By {post.profiles?.name || 'Unknown Author'}</span>
          <span className="date">{formatDate(post.created_at)}</span>
        </div>
        
        <h2 className="post-title">
          <Link to={`/post/${post.id}`}>{post.title}</Link>
        </h2>
        
        <p className="post-excerpt">{truncateContent(post.content)}</p>
        
        {post.tags && post.tags.length > 0 && (
          <div className="post-tags">
            {post.tags.map((tag, index) => (
              <span key={index} className="tag">#{tag}</span>
            ))}
          </div>
        )}
        
        <div className="post-footer">
          <div className="post-footer-top">
            <div className="post-stats">
              <span>❤️ {post.likes || 0}</span>
              <span>💬 {post.comments?.length || 0}</span>
            </div>
            <Link to={`/post/${post.id}`} className="read-more">
              Read More
            </Link>
          </div>
          <div className="post-footer-bottom">
            <div className="post-actions">
              {onEdit && (
                <button onClick={onEdit} className="edit-post-btn">
                  Edit
                </button>
              )}
              {onDelete && (
                <button onClick={() => onDelete(post.id)} className="delete-post-btn">
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;


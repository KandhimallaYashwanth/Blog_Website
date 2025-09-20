import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import './PostCard.scss';

const PostCard = ({ post }) => {
  const formatDate = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
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
          <span className="author">By {post.author?.name || 'Unknown'}</span>
          <span className="date">{formatDate(post.createdAt)}</span>
        </div>
        
        <h2 className="post-title">
          <Link to={`/post/${post._id}`}>{post.title}</Link>
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
          <Link to={`/post/${post._id}`} className="read-more">
            Read More
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostCard;


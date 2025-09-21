import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { updateProfile } from '../store/slices/authSlice';
import { fetchUserPosts } from '../store/slices/postsSlice';
import PostCard from '../components/PostCard/PostCard';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth'; // Import the new hook
import './Profile.scss';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated, token, loading: authLoading } = useAuth(); // Use the useAuth hook
  const { userPosts, loading: postsLoading } = useSelector((state) => state.posts);
  
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(user?.profile_picture || null);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('You need to be logged in to view this page.');
      navigate('/login');
      return;
    }

    if (user && user.id) {
      dispatch(fetchUserPosts(user.id));
      reset({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
      });
      setProfileImage(user.profile_picture || null);
    } else if (isAuthenticated && !user?.id) {
      // This case handles when isAuthenticated is true but user.id is missing (incomplete user data)
      console.warn('Profile page: Authenticated but user ID is missing. Logging out.');
      toast.error('Session data incomplete. Please log in again.');
      // You might want to dispatch a logout action here if you want to force re-login
      // dispatch(logout());
      navigate('/login');
    }
  }, [user, dispatch, reset, isAuthenticated, navigate]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      reset({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
      });
    }
  };

  const onSubmit = (data) => {
    const profileData = {
      ...data,
      profile_picture: profileImage, // Use profile_picture for backend consistency
    };
    
    dispatch(updateProfile({ userId: user.id, ...profileData })).then((result) => {
      if (result.type.endsWith('fulfilled')) {
        toast.success('Profile updated successfully!');
        setIsEditing(false);
      }
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (authLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="profile">
      <div className="container">
        <div className="profile-content">
          <div className="profile-header">
            <div className="profile-info">
              <div className="profile-avatar">
                {profileImage ? (
                  <img src={profileImage} alt={user?.name} />
                ) : (
                  <div className="avatar-placeholder">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              
              <div className="profile-details">
                <h1>{user?.name}</h1>
                <p className="profile-email">{user?.email}</p>
                <p className="profile-bio">{user?.bio || 'No bio available'}</p>
                
                <div className="profile-stats">
                  <div className="stat">
                    <span className="stat-number">{userPosts.length}</span>
                    <span className="stat-label">Posts</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">
                      {userPosts.reduce((total, post) => total + (post.likes || 0), 0)}
                    </span>
                    <span className="stat-label">Total Likes</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="profile-actions">
              <button onClick={handleEditToggle} className="edit-profile-btn">
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
              <Link to="/create" className="create-post-btn">
                Create New Post
              </Link>
            </div>
          </div>

          {isEditing && (
            <div className="profile-edit-form">
              <h3>Edit Profile</h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    {...register('name', {
                      required: 'Name is required',
                      minLength: {
                        value: 2,
                        message: 'Name must be at least 2 characters'
                      }
                    })}
                  />
                  {errors.name && <span className="error">{errors.name.message}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                  {errors.email && <span className="error">{errors.email.message}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    id="bio"
                    rows="4"
                    {...register('bio')}
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="profilePicture">Profile Picture</label>
                  <input
                    type="file"
                    id="profilePicture"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {profileImage && (
                    <div className="image-preview">
                      <img src={profileImage} alt="Profile preview" />
                    </div>
                  )}
                </div>

                <div className="form-actions">
                  <button type="submit" className="save-btn">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="user-posts">
            <h2>Your Posts</h2>
            
            {postsLoading ? (
              <LoadingSpinner />
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
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';
import { fetchPosts } from '../../store/slices/postsSlice';
import './Layout.scss';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <NavLink to="/" className="logo" onClick={closeMobileMenu}>
              BlogSphere
            </NavLink>
            
            {/* Mobile menu button */}
            <button 
              className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            
            {/* Desktop navigation */}
            <nav className="nav desktop-nav">
              <NavLink to="/" className="nav-link" end>Home</NavLink>
              {isAuthenticated ? (
                <>
                  <NavLink to="/create" className="nav-link">Create Post</NavLink>
                  <NavLink to="/my-posts" className="nav-link">My Posts</NavLink>
                  <NavLink to="/profile" className="nav-link">Profile</NavLink>
                  <div className="user-menu">
                    <span className="user-name">Hi, {user?.name}</span>
                    <button onClick={handleLogout} className="logout-btn">
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <NavLink to="/login" className="nav-link">Login</NavLink>
                  <NavLink to="/signup" className="nav-link">Signup</NavLink>
                </>
              )}
            </nav>
          </div>
          
          {/* Mobile navigation */}
          <nav className={`nav mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
            <NavLink to="/" className="nav-link" onClick={closeMobileMenu} end>Home</NavLink>
            {isAuthenticated ? (
              <>
                <NavLink to="/create" className="nav-link" onClick={closeMobileMenu}>Create Post</NavLink>
                <NavLink to="/my-posts" className="nav-link" onClick={closeMobileMenu}>My Posts</NavLink>
                <NavLink to="/profile" className="nav-link" onClick={closeMobileMenu}>Profile</NavLink>
                <div className="user-menu">
                  <span className="user-name">Hi, {user?.name}</span>
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <NavLink to="/login" className="nav-link" onClick={closeMobileMenu}>Login</NavLink>
                <NavLink to="/signup" className="nav-link" onClick={closeMobileMenu}>Signup</NavLink>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="main">
        {children}
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 BlogSphere. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;


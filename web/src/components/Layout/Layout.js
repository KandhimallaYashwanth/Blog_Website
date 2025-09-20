import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';
import { fetchPosts } from '../../store/slices/postsSlice';
import DemoMode from '../DemoMode/DemoMode';
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
      <DemoMode />
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo" onClick={closeMobileMenu}>
              BlogSphere
            </Link>
            
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
              <Link to="/" className="nav-link">Home</Link>
              {isAuthenticated ? (
                <>
                  <Link to="/create" className="nav-link">Create Post</Link>
                  <Link to="/profile" className="nav-link">Profile</Link>
                  <div className="user-menu">
                    <span className="user-name">Hi, {user?.name}</span>
                    <button onClick={handleLogout} className="logout-btn">
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-link">Login</Link>
                  <Link to="/signup" className="nav-link">Signup</Link>
                </>
              )}
            </nav>
          </div>
          
          {/* Mobile navigation */}
          <nav className={`nav mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
            <Link to="/" className="nav-link" onClick={closeMobileMenu}>Home</Link>
            {isAuthenticated ? (
              <>
                <Link to="/create" className="nav-link" onClick={closeMobileMenu}>Create Post</Link>
                <Link to="/profile" className="nav-link" onClick={closeMobileMenu}>Profile</Link>
                <div className="user-menu">
                  <span className="user-name">Hi, {user?.name}</span>
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link" onClick={closeMobileMenu}>Login</Link>
                <Link to="/signup" className="nav-link" onClick={closeMobileMenu}>Signup</Link>
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


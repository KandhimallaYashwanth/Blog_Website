import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { logout } from '../store/slices/authSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    // Basic token validation (more robust validation should happen on backend)
    if (isAuthenticated && token) {
      // In a real application, you might decode the JWT to check expiration
      // For now, relying on backend 401/403 responses

      // Check if user object is complete (has _id)
      if (!user || !user.id) {
        console.warn('User data incomplete, logging out.');
        toast.error('Session data incomplete. Please log in again.');
        dispatch(logout());
        navigate('/login'); // Redirect to login
      }
    } else if (isAuthenticated && !token) {
      // isAuthenticated is true but no token - inconsistent state
      console.warn('Inconsistent auth state: isAuthenticated is true but token is missing. Logging out.');
      toast.error('Authentication token missing. Please log in again.');
      dispatch(logout());
      navigate('/login'); // Redirect to login
    }
  }, [isAuthenticated, token, user, dispatch, navigate]);

  return { user, token, isAuthenticated };
};

export default useAuth;

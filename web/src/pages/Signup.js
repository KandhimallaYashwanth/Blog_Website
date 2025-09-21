import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import GoogleAuth from '../components/GoogleAuth/GoogleAuth';
import { registerUser, googleAuth, clearError } from '../store/slices/authSlice';
import toast from 'react-hot-toast';
import './Auth.scss';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  const handleGoogleSuccess = (googleData) => {
    // The GoogleAuth component now returns an object with `tokenId` which is the `id_token`
    dispatch(googleAuth({ id_token: googleData.tokenId }));
  };

  const handleGoogleFailure = (error) => {
    toast.error('Google authentication failed');
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Create your account</h2>
        
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
              placeholder="Enter your full name"
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
              placeholder="Enter your email"
            />
            {errors.email && <span className="error">{errors.email.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              placeholder="Enter your password"
            />
            {errors.password && <span className="error">{errors.password.message}</span>}
          </div>

           <button type="submit" className="submit-btn">
             Sign Up
           </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <GoogleAuth
          onSuccess={handleGoogleSuccess}
          onFailure={handleGoogleFailure}
          buttonText="Continue with Google"
        />

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

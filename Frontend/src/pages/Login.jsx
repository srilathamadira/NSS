import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "../login.css";
import axiosClient from '../client';



export default function AuthForm({ setIsLoggedIn, isLoggedIn }) {
  const [isLogin, setIsLogin] = useState(true);
  const [isUser, setIsUser] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);
  
    try {
      const endpoint = isUser
        ? isLogin
          ? '/user/login'
          : '/user/register'
        : '/admin/login';
  
      const dataToSend = {
        ...formData,
        role: isUser ? 'user' : 'admin',
      };
  
      const response = await axiosClient.post(endpoint, dataToSend, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true, // Ensure cookies & authentication headers are sent
      });
  
      const data = response.data;
      setIsLoggedIn(true);
      setErrorMessage('');
      setFormData({ username: '', email: '', password: '', confirmPassword: '' });
      toast.success(isLogin ? 'Login successful!' : 'Registration successful!');
  
      if (isUser) {
        if (isLogin) {
          localStorage.setItem('token', data.token);
          setIsLoggedIn(true);
          navigate('/');
        } else {
          setIsLogin(true);
        }
      } else {
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        navigate('/admin');
      }
    } catch (error) {
      setIsLoggedIn(false);
      setErrorMessage(error.response?.data?.error || 'Request failed.');
      toast.error(error.response?.data?.error || 'Request failed.');
    } finally {
      setLoading(false);
    }
  };
  
  

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ username: '', email: '', password: '', confirmPassword: '' });
  };

  const switchToUser = () => {
    setIsUser(true);
    setIsLogin(true);
  };

  const switchToAdmin = () => {
    setIsUser(false);
    setIsLogin(true);
  };

  return (
    <div className='container pb-28'>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className='form-container'>
        <div className='form-toggle'>
          <button className={isUser ? 'active' : "text-black"} onClick={switchToUser}>User</button>
          <button className={!isUser ? 'active' : "text-black"} onClick={switchToAdmin}>Admin</button>
        </div>

        <form onSubmit={handleSubmit}>
          {isUser ? (
            isLogin ? (
              <div className='form text-black'>
                <h2>User Login</h2>
                <input type='text' name='email' placeholder='Email' value={formData.email} onChange={handleChange} required />
                <input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange} required />
                <a href='#'>Forgot Password?</a>
                <button type='submit' disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
                <p>Not a Member? <a href='#' onClick={toggleForm}>Signup now</a></p>
              </div>
            ) : (
              <div className='form text-black'>
                <h2>User Signup</h2>
                <input type='text' name='username' placeholder='Username' value={formData.username} onChange={handleChange} required />
                <input type='email' name='email' placeholder='Email' value={formData.email} onChange={handleChange} required />
                <input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange} required />
                <input type='password' name='confirmPassword' placeholder='Confirm Password' value={formData.confirmPassword} onChange={handleChange} required />
                <button type='submit' disabled={loading}>{loading ? 'Signing up...' : 'Signup'}</button>
                <p>Already a Member? <a href='#' onClick={toggleForm}>Login now</a></p>
              </div>
            )
          ) : (
            <div className='form text-black'>
              <h2>Admin Login</h2>
              <input type='email' name='email' placeholder='Email' value={formData.email} onChange={handleChange} required />
              <input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange} required />
              {errorMessage && <p className="error-message text-red-500">{errorMessage}</p>}
              <a href='#'>Forgot Password?</a>
              <button type='submit' disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

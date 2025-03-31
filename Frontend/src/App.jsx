import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import axios from 'axios';
import useLocalStorage from 'use-local-storage';
import { ToastContainer } from 'react-toastify';
import { DNA } from 'react-loader-spinner'

const Faqs = lazy(() => import('./components/Faqs'));
const Home = lazy(() => import('./pages/Home'));
const RequestHelp = lazy(() => import('./pages/RequestHelp'));
const Login = lazy(() => import('./pages/Login'));
const AdminComponent = lazy(() => import('./pages/Administration'));
const Admin = lazy(() => import('./pages/Admin'));
const Gallery = lazy(() => import('./components/Gallery'));
const About = lazy(() => import('./pages/About'));

function App() {
  const preference = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [isDark] = useLocalStorage('isDark', preference);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/admin/campaigns');
        setData(response.data);
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  if (loading) return  <div className='flex item-center justify-center my-56'><DNA height={100} width={100} /></div>;

  return (
    <BrowserRouter>
      <ScrollToTop />
      <ToastContainer position='top-center' theme="colored" />
      <div
        className={`min-h-screen bg-gradient-to-br ${isDark ? 'from-gray-900 to-gray-800' : 'from-indigo-50 to-white'}`}
        data-theme={isDark ? 'dark' : 'light'}
      >
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Suspense fallback={ <div className='flex item-center justify-center my-56'><DNA height={100} width={100} /></div>}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path='/administration' element={<AdminComponent />} />
            <Route path='/admin' element={<ProtectedRoute isLoggedIn={isLoggedIn}><Admin /> </ProtectedRoute>} />
            <Route path='/gallery' element={<Gallery />} />
            <Route
              path='/request-help'
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <RequestHelp />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Faqs />
        </Suspense>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
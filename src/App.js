// src/App.jsx
import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import FriendsPage from './pages/FriendsPage';

import NotFound from './pages/NotFound';
import AppNavbar from './components/Navbar';
import { setCredentials } from './redux/slices/authSlice';
import PrivateRoute from './components/PrivateRoute';
import './App.css';
import ChatRoomPage from './pages/ChatRoomPage';
import ChatRoom from './pages/ChatRoom';

const App = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector(state => state.auth);

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      dispatch(setCredentials({
        token: storedToken,
        user: JSON.parse(storedUser),
      }));
    }
  }, [dispatch]);

  return (
    <>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={!accessToken ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/friends" element={
          <PrivateRoute>
            <FriendsPage />
          </PrivateRoute>
        } />
        {/* <Route path="/channels" element={
          <PrivateRoute>
            <ChatRoom/>
          </PrivateRoute>
        } /> */}
        <Route path="/channels/chat/:channelId" element={<ChatRoom />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;

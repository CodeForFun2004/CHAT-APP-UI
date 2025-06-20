import React from 'react';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <div className="container mt-4">
      <h2>Trang chủ Chat App</h2>
      {user ? (
        <p>Bạn đang đăng nhập với tài khoản: <strong>{user.username}</strong></p>
      ) : (
        <p>Chào mừng! Vui lòng đăng nhập để bắt đầu trò chuyện.</p>
      )}
    </div>
    </div>
   
  );
};

export default HomePage;
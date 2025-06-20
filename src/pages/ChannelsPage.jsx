import React, { useEffect } from "react";
import axios from '../api/axios';

const ChannelsPage = () => {

  useEffect(() => {
    const checkProtected = async () => {
      try {
        const res = await axios.get('/protected-test');
        console.log(res.data.message);
      } catch (err) {
        console.error('❌ Lỗi gọi API bảo vệ:', err.response?.data || err.message);
      }
    };

    checkProtected();
  }, []);
  return (
    <div>
      <div className="container mt-4"> ChannelsPage</div>
    </div>
  );
};

export default ChannelsPage;

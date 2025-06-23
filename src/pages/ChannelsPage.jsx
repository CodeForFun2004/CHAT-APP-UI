// src/pages/ChannelsPage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserChannels, setCurrentChannel } from '../redux/slices/channelSlice';
import { useParams } from 'react-router-dom';

const ChannelsPage = () => {
  const dispatch = useDispatch();
  const { accessToken, user } = useSelector((state) => state.auth);
  const { channels, currentChannel } = useSelector((state) => state.channel);
  const { friendId } = useParams();

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchUserChannels(user._id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (channels.length > 0 && friendId) {
      const matched = channels.find(ch =>
        ch.members.includes(friendId)
      );
      if (matched) {
        dispatch(setCurrentChannel(matched));
      }
    }
  }, [channels, friendId, dispatch]);

  return (
    <div className="container py-4">
      <h2>Kênh của bạn</h2>
      <ul>
        {channels.map((ch) => (
          <li key={ch._id} style={{ fontWeight: ch._id === currentChannel?._id ? 'bold' : 'normal' }}>
            {ch.members.filter(id => id !== user._id).join(', ')}
          </li>
        ))}
      </ul>

      {currentChannel ? (
        <div className="mt-4">
          <h4>Đang chat trong kênh:</h4>
          <pre>{JSON.stringify(currentChannel, null, 2)}</pre>
        </div>
      ) : (
        <p>Chưa chọn kênh nào.</p>
      )}
    </div>
  );
};

export default ChannelsPage;

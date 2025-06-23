// 📁 src/pages/FriendsPage.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import axios from '../api/axios';
import SuggestList from '../components/SuggestList';
import FriendsList from '../components/FriendsList';

const FriendsPage = () => {
  const rawUser = useSelector((state) => state.auth.user);

  let storedUser = null;
  const storedRaw = localStorage.getItem('user');
  if (storedRaw) {
    try {
      storedUser = JSON.parse(storedRaw);
    } catch (e) {
      console.warn('⚠️ Failed to parse user from localStorage:', e);
    }
  }

  const user = rawUser || storedUser;
  const userId = user && (user._id || user.id);

  const [suggestedFriends, setSuggestedFriends] = useState([]);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      if (!userId) return;

      try {
        const [res1, res2] = await Promise.all([
          axios.get(`/users/${userId}/suggestions`),
          axios.get(`/users/${userId}/friends`)
        ]);

        const grouped = [];
        for (let i = 0; i < res1.data.length; i += 3) {
          grouped.push(res1.data.slice(i, i + 3));
        }

        setSuggestedFriends(grouped);
        setFriends(res2.data);
      } catch (err) {
        console.error('❌ Error fetching friend data:', err.response?.data || err.message);
      }
    };

    fetchFriends();
  }, [userId]);

  return (
    <Container className="mt-4">
      <SuggestList suggestedFriends={suggestedFriends} />
      <FriendsList friends={friends} />
    </Container>
  );
};

export default FriendsPage;

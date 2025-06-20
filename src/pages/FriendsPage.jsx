// 📁 src/pages/FriendsPage.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import axios from '../api/axios';

const FriendsPage = () => {
  const user = useSelector((state) => state.auth.user) || JSON.parse(localStorage.getItem('user'));
  const userId = user?._id;

  const [suggestedFriends, setSuggestedFriends] = useState([]);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        if (!userId) {
          console.warn('⚠️ userId is missing');
          return;
        }

        const res1 = await axios.get(`/users/${userId}/suggestions`);
        const res2 = await axios.get(`/users/${userId}/friends`);

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
      <h2 className="mb-4">Gợi ý kết bạn</h2>
      <Carousel indicators={false} interval={null} className="mb-5">
        {suggestedFriends.map((group, index) => (
          <Carousel.Item key={index}>
            <Row>
              {group.map((user) => (
                <Col key={user._id} md={4}>
                  <Card className="mb-3">
                    <Card.Img variant="top" src={user.avatar || '/default-avatar.png'} />
                    <Card.Body>
                      <Card.Title>{user.username}</Card.Title>
                      <Card.Text>{user.email}</Card.Text>
                      <Button variant="primary">Kết bạn</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>

      <h3>Danh sách bạn bè</h3>
      <Row>
        {friends.length === 0 ? (
          <Col><p>Chưa có bạn bè nào.</p></Col>
        ) : (
          friends.map(friend => (
            <Col key={friend._id} md={3}>
              <Card className="mb-3">
                <Card.Img variant="top" src={friend.avatar || '/default-avatar.png'} />
                <Card.Body>
                  <Card.Title>{friend.username}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default FriendsPage;

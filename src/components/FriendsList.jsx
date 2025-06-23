import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useSelector } from 'react-redux';

const cardStyle = { maxWidth: '250px', margin: '0 auto' };
const imgStyle = { height: '200px', objectFit: 'cover' };

const FriendsList = ({ friends }) => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  // Luôn dùng user.id (không dùng _id)
  const currentUserId = user?.id;

  const handleChat = async (friendId) => {
    if (!currentUserId) {
      console.warn('❌ Chưa xác định được người dùng hiện tại.');
      return;
    }

    try {
      const res = await axios.post('/channels', {
        userId1: currentUserId,
        userId2: friendId,
      });

      const channelId = res.data._id;
      navigate(`/channels/chat/${channelId}`);
    } catch (err) {
      console.error('Không thể mở kênh chat:', err);
    }
  };

  return (
    <>
      <h3>Danh sách bạn bè</h3>
      <Row className="g-4">
        {friends.length === 0 ? (
          <Col><p>Chưa có bạn bè nào.</p></Col>
        ) : (
          friends.map(friend => (
            <Col key={friend._id} xs={12} sm={6} md={3} className="d-flex justify-content-center">
              <Card style={cardStyle}>
                <Card.Img variant="top" src={friend.avatar || '/default-avatar.png'} style={imgStyle} />
                <Card.Body>
                  <Card.Title>{friend.username}</Card.Title>
                  <Button variant="outline-primary" onClick={() => handleChat(friend._id)}>💬 Chat</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </>
  );
};

export default FriendsList;

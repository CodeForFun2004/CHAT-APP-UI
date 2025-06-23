// src/pages/ChatRoomPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, ListGroup } from 'react-bootstrap';

const dummyUsers = [
  { _id: '684fe1becc3030323d6af8ab', username: 'nhs211306', avatar: '/default-avatar.png' },
  { _id: '684fd9f9cf8d3ab154b94637', username: 'huesuongnguyen72', avatar: '/default-avatar.png' },
];

const ChatRoomPage = () => {
  const { friendId } = useParams();
  const friend = dummyUsers.find(u => u._id === friendId);

  return (
    <Container className="mt-4">
      {friend ? (
        <>
          <Card>
            <Card.Header>💬 Đang trò chuyện với <strong>{friend.username}</strong></Card.Header>
            <Card.Body style={{ minHeight: '300px', backgroundColor: '#f9f9f9' }}>
              {/* Fake tin nhắn */}
              <ListGroup variant="flush">
                <ListGroup.Item><strong>{friend.username}:</strong> Hello bạn!</ListGroup.Item>
                <ListGroup.Item><strong>Bạn:</strong> Chào bạn nha 👋</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </>
      ) : (
        <p>Không tìm thấy người dùng.</p>
      )}
    </Container>
  );
};

export default ChatRoomPage;

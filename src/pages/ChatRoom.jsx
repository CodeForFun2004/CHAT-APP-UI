import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import { useSelector } from 'react-redux';
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import socket from '../socket';

const ChatRoom = () => {
  const { channelId } = useParams();
  const { user } = useSelector(state => state.auth);
  const currentUserId = user?.id;

  const [messages, setMessages] = useState([]);
  const [friendInfo, setFriendInfo] = useState(null); // 🧠 Friend's avatar + name
  const [content, setContent] = useState('');
  const messagesEndRef = useRef(null);

  // Load danh sách tin nhắn và friend info
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/messages/${channelId}`);
        setMessages(res.data);

        // 📌 Tìm người còn lại trong channel (friend)
        const sampleMsg = res.data.find(msg => {
          const senderId = typeof msg.sender === 'object' ? msg.sender._id : msg.sender;
          return senderId !== currentUserId;
        });

        if (sampleMsg && sampleMsg.sender && typeof sampleMsg.sender === 'object') {
          setFriendInfo({
            username: sampleMsg.sender.username,
            avatar: sampleMsg.sender.avatar || '/default-avatar.png'
          });
        }
      } catch (err) {
        console.error('❌ Lỗi tải tin nhắn:', err);
      }
    };

    fetchMessages();
  }, [channelId, currentUserId]);

  // Join socket room
  useEffect(() => {
    if (!channelId) return;
    socket.emit('joinChannel', channelId);
  }, [channelId]);

  // Lắng nghe tin nhắn mới
  useEffect(() => {
    socket.on('newMessage', (newMsg) => {
      setMessages(prev => [...prev, newMsg]);
    });

    return () => {
      socket.off('newMessage');
    };
  }, []);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    socket.emit('sendMessage', {
      channelId,
      senderId: currentUserId,
      content,
    });

    setContent('');
  };

  return (
    <Container >
      {/* 🎯 Tiêu đề phòng chat */}
      <div className="d-flex align-items-center gap-2 mb-3">
        {friendInfo && (
          <>
            <Image src={friendInfo.avatar} roundedCircle width={40} height={40} />
            <div>
              <strong>{friendInfo.username}</strong>
              <div style={{ fontSize: '0.8rem', color: 'gray' }}>Đang hoạt động</div>
            </div>
          </>
        )}
      </div>

      {/* 💬 Vùng hiển thị tin nhắn */}
      <div
  className="chat-box"
  style={{
    height: '400px',
    maxHeight: '400px', // thêm maxHeight để đảm bảo không phát triển vượt khung
    overflowY: 'auto',
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '8px',
  }}
>
        {messages.map(msg => {
          const senderId = typeof msg.sender === 'object' ? msg.sender._id : msg.sender;
          const isOwnMessage = senderId === currentUserId;
          // const avatar = msg.sender?.avatar || '/default-avatar.png';

          return (
            <div key={msg._id || Math.random()} className="d-flex mb-2"
              style={{ justifyContent: isOwnMessage ? 'flex-end' : 'flex-start' }}>
              {/* {!isOwnMessage && (
                <Image src={avatar} roundedCircle width={32} height={32} className="me-2" />
              )} */}
              <div style={{
                padding: '10px',
                borderRadius: '15px',
                backgroundColor: isOwnMessage ? '#cce5ff' : '#e2e3e5',
                maxWidth: '70%'
              }}>
                {msg.content}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef}></div>
      </div>

      {/* 📤 Form gửi */}
      <Form onSubmit={handleSend} className="mt-3">
        <Row>
          <Col xs={10}>
            <Form.Control
              type="text"
              placeholder="Nhập tin nhắn..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Col>
          <Col xs={2}>
            <Button type="submit" variant="primary" className="w-100">Gửi</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default ChatRoom;

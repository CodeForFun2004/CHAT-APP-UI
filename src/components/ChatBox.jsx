import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

const ChatBox = ({ channel }) => {
  const [messages, setMessages] = useState([
    { sender: 'Toàn Ngô', content: 'Tớ dậy sớm rồi nè!' },
    { sender: 'Bạn', content: 'Cố lên, mai tập sớm nhé' }
  ]);
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim() !== '') {
      setMessages(prev => [...prev, { sender: 'Bạn', content: text }]);
      setText('');
    }
  };

  return (
    <Card className="p-3" style={{ minHeight: '500px' }}>
      <Card.Title>💬 Đang trò chuyện với: {channel.name}</Card.Title>
      <div className="flex-grow-1 mb-3" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.sender === 'Bạn' ? 'text-end' : 'text-start'}`}>
            <strong>{msg.sender}:</strong> <span>{msg.content}</span>
          </div>
        ))}
      </div>

      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <Form.Group className="d-flex">
          <Form.Control
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Nhập tin nhắn..."
          />
          <Button variant="primary" type="submit" className="ms-2">Gửi</Button>
        </Form.Group>
      </Form>
    </Card>
  );
};

export default ChatBox;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import { loginUser } from '../redux/slices/authSlice';

const LoginPage = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ usernameOrEmail, password }));
    if (loginUser.fulfilled.match(result)) {
      navigate('/');
    }
  };

  const handleGoogleLogin = () => {
    // window.location.href = 'http://localhost:3000/api/auth/google';
    window.location.href = 'https://chat-app-api-gbbm.onrender.com/api/auth/google';

  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <Card.Body>
          <h3 className="text-center mb-4">Đăng nhập</h3>
          {error && <p className="text-danger text-center">{error}</p>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username hoặc Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập username hoặc email"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100 mb-3" disabled={loading}>
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>

            <div className="text-center text-muted mb-2">hoặc</div>

            <Button variant="danger" className="w-100" onClick={handleGoogleLogin}>
              Đăng nhập với Google
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginPage;

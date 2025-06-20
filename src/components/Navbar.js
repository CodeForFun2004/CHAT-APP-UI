import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

const AppNavbar = () => {
  const { user, accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <Navbar bg="dark" variant="dark" expand="lg" style={{ padding: "20px" }}>
      <Container>
        <Navbar.Brand as={Link} to="/">ChatApp</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/" className={isActive('/') ? 'nav-active' : ''}>Home</Nav.Link>
          <Nav.Link as={Link} to="/friends" className={isActive('/friends') ? 'nav-active' : ''}>Friends</Nav.Link>
          <Nav.Link as={Link} to="/channels" className={isActive('/channels') ? 'nav-active' : ''}>Channels</Nav.Link>
        </Nav>
        <Nav>
          {accessToken ? (
            <>
              <Navbar.Text className="me-3">Xin chào, <strong>{user?.username}</strong></Navbar.Text>
              <Button variant="outline-light" size="sm" onClick={handleLogout}>Đăng xuất</Button>
            </>
          ) : (
            <Button as={Link} to="/login" variant="outline-light" size="sm">Đăng nhập</Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;

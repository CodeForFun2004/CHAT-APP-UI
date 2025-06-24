// src/components/Navbar.jsx
import React from "react";
import { Navbar, Nav, Container, Button, Image } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const AppNavbar = () => {
  const { user, accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isChannelActive = location.pathname.startsWith("/channels");

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          💬 ChatApp
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" active={isActive("/")}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/friends" active={isActive("/friends")}>
              Friends
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/channels"
              className={isChannelActive ? "active" : ""}
            >
              Channels
            </Nav.Link>
          </Nav>

          <Nav className="ms-auto">
            {accessToken ? (
              <>
                <Navbar.Text className="me-3">
                  <Image
                    src={user.avatar}
                    roundedCircle
                    width={32}
                    height={32}
                    className="me-2 border border-white"
                  />
                  <strong>{user?.username}</strong>
                </Navbar.Text>
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </Button>
              </>
            ) : (
              <Button as={Link} to="/login" variant="outline-light" size="sm">
                Đăng nhập
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;

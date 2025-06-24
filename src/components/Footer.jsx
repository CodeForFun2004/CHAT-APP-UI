import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
  FaFacebookSquare,
  FaInstagram,
  FaTwitterSquare,
  FaGithubSquare,
  FaDribbbleSquare,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-4 mt-5">
      <Container>
        <Row>
          {/* Logo + Mô tả + Social */}
          <Col md={4}>
            <h3 className="text-white fw-bold">Chat App</h3>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id odit ullam iste repellat consequatur libero reiciendis, blanditiis accusantium.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookSquare size={28} /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram size={28} /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitterSquare size={28} /></a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"><FaGithubSquare size={28} /></a>
              <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer"><FaDribbbleSquare size={28} /></a>
            </div>
          </Col>

          {/* Danh mục liên kết */}
          <Col md={2}>
            <h5 className="fw-bold">Solutions</h5>
            <ul className="list-unstyled">
              <li>Analytics</li>
              <li>Marketing</li>
              <li>Commerce</li>
              <li>Insights</li>
            </ul>
          </Col>

          <Col md={2}>
            <h5 className="fw-bold">Support</h5>
            <ul className="list-unstyled">
              <li>Pricing</li>
              <li>Documentation</li>
              <li>Guides</li>
              <li>API Status</li>
            </ul>
          </Col>

          <Col md={2}>
            <h5 className="fw-bold">Company</h5>
            <ul className="list-unstyled">
              <li>About</li>
              <li>Blog</li>
              <li>Jobs</li>
              <li>Press</li>
              <li>Careers</li>
            </ul>
          </Col>

          <Col md={2}>
            <h5 className="fw-bold">Legal</h5>
            <ul className="list-unstyled">
              <li>Claim</li>
              <li>Policy</li>
              <li>Terms</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

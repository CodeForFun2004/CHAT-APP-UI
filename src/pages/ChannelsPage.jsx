import React, { useEffect } from 'react';
import { Container, Card, Button, Row, Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserChannels } from '../redux/slices/channelSlice';

const ChannelsPage = () => {
  const dispatch = useDispatch();
  const channels = useSelector(state => state.channel.channels);
  const currentUserId = useSelector(state => state.auth.user?.id);

  useEffect(() => {
    dispatch(fetchUserChannels(currentUserId));
  }, [dispatch, currentUserId]);

  const getFriendFromChannel = (members) => {
    return members.find(member => member._id !== currentUserId);
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Your Chat Rooms</h2>
      <Row>
        {channels.map(channel => {
          const friend = getFriendFromChannel(channel.members);

          return (
            <Col md={4} key={channel._id} className="mb-4">
              <Card className="shadow-sm">
                <Card.Body>
                  <div className="d-flex align-items-center">
                    <Image
                      src={friend?.avatar || '../assets/images/default-avatar.png'}
                      roundedCircle
                      width={50}
                      height={50}
                      className="me-3"
                      onError={(e) => e.target.src = '../assets/images/default-avatar.png'}
                    />
                    <div>
                      <Card.Title>{friend?.username || 'Unknown User'}</Card.Title>
                      <Card.Text className="text-muted">
                      Created: {new Date(channel.createdAt).toLocaleDateString()}
                      </Card.Text>
                    </div>
                  </div>
                  <Link to={`/channels/chat/${channel._id}`}>
                    <Button variant="primary" className="mt-3 w-100">
                      Enter the Chat
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default ChannelsPage;

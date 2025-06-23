// 📁 src/components/SuggestList.jsx
import React from "react";
import { Carousel, Row, Col, Card, Button } from "react-bootstrap";

const SuggestList = ({ suggestedFriends }) => {
  return (
    <>
      <h2 className="mb-4">Gợi ý kết bạn</h2>
      <Carousel
        indicators={false}
        interval={4000}
        controls={suggestedFriends.length > 1}
        className="mb-5"
      >
        {suggestedFriends.map((group, index) => (
          <Carousel.Item key={index}>
            <Row>
              {group.map((user, idx) => (
                <Col key={idx} md={4}>
                  {user ? (
                    <Card className="h-100 text-center">
                      <div
                        style={{
                          width: "100%",
                          height: "200px",
                          overflow: "hidden",
                        }}
                      >
                        <Card.Img
                          variant="top"
                          src={user.avatar || "/default-avatar.png"}
                          style={{
                            height: "200px",
                            width: "100%",
                            objectFit: "contain",
                            backgroundColor: "#fff",
                            padding: "10px",
                          }}
                        />
                      </div>
                      <Card.Body>
                        <Card.Title>{user.username}</Card.Title>
                        <Card.Text>{user.email}</Card.Text>
                        <Button variant="primary">Kết bạn</Button>
                      </Card.Body>
                    </Card>
                  ) : (
                    <div style={{ height: "100%" }}></div>
                  )}
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default SuggestList;

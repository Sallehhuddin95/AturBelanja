import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function MainScreen() {
  return (
    <Container className="d-flex flex-column my-3 ">
      <h1>Expenses Tracking</h1>
      <Row>
        <Col>
          <Card>
            {" "}
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default MainScreen;

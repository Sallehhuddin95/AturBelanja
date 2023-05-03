import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { ExpensesTable } from "../components";

function MainScreen() {
  return (
    <Container className="d-flex flex-column py-3">
      <Row className="">
        <h1>Expenses Tracking</h1>
      </Row>
      <Row className="my-2">
        <Col md={2}>
          {" "}
          <Button variant="outline-dark" size="sm">
            Add
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <ExpensesTable />
        </Col>
      </Row>
    </Container>
  );
}

export default MainScreen;

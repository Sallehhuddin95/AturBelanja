import React from "react";
import { Container, Row, Table } from "react-bootstrap";

function BudgetHistoryScreen() {
  return (
    <Container>
      <Row>
        <h2>Budget History</h2>
      </Row>
      <Row>
        <Table striped bordered>
          <thead>
            <tr>
              <th>Month and Year</th>
              <th>Total Budget (RM)</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>January 2023</td>
              <td>2500</td>
              <td>2023-01-01</td>
              <td>2023-01-15</td>
            </tr>
            <tr>
              <td>February 2023</td>
              <td>3000</td>
              <td>2023-02-01</td>
              <td>2023-02-10</td>
            </tr>
            <tr>
              <td>March 2023</td>
              <td>4500</td>
              <td>2023-02-01</td>
              <td>2023-03-18</td>
            </tr>
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}

export default BudgetHistoryScreen;

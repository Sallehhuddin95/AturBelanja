import React from "react";
import { Table, Row, Col } from "react-bootstrap";

function ExpensesTable() {
  const currentDay = new Date().getDate();
  const currentYear = new Date().getFullYear();
  const numberOfDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const daysInApril = numberOfDaysInMonth(2023, 4);

  const daysArray = Array.from({ length: daysInApril }, (_, i) => i + 1);

  console.log(currentDay);

  return (
    <>
      {daysArray.map((day) => (
        <div key={day} className="my-3">
          {" "}
          <Row className="my-3">
            <Col>
              <strong>Date: {day} April 2023</strong>
            </Col>{" "}
            <Col>Total Daily Income: </Col> <Col>Total Daily Spending: </Col>
          </Row>
          <Row>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Details</th>
                  <th>Category</th>
                  <th>Price (RM)</th>
                  <th>Payment Method</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Test</td>
                  <td>Test</td>
                  <td>Test</td>
                  <td>Test</td>
                </tr>
              </tbody>
            </Table>
          </Row>
        </div>
      ))}
    </>
  );
}

export default ExpensesTable;

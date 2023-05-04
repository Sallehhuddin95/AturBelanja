import React from "react";
import { Table, Row, Col } from "react-bootstrap";

const monthsList: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function ExpensesTable(props: any) {
  const { selectedMonth, selectedYear } = props;
  console.log(selectedMonth, selectedYear);

  const currentDay = new Date().getDate();

  const numberOfDaysInMonth = (year: number, monthName: string): number => {
    // Create a new date object with the year and month
    const monthNumber = monthsList.indexOf(monthName);
    const date = new Date(year, monthNumber + 1, 0);

    // Return the number of days in the month
    return date.getDate();
  };

  const daysInMonth = numberOfDaysInMonth(selectedYear, selectedMonth);

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <>
      {daysArray.map((day) => (
        <div key={day} className="my-3">
          <Row className="my-3">
            <Col>
              <strong>
                Date: {day} {selectedMonth} {selectedYear}
              </strong>
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

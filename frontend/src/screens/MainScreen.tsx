import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { ExpensesTable, ExpensesForm } from "../components";

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

function MainScreen() {
  const currentMonthIndex = new Date().getMonth();
  const currentMonth = monthsList[currentMonthIndex];

  const currentYear = new Date().getFullYear();
  const yearsList: number[] = [
    currentYear,
    currentYear - 1,
    currentYear - 2,
    currentYear - 3,
  ];

  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth);
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  const handleMonthChange = (e: any) => {
    e.preventDefault();
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e: any) => {
    e.preventDefault();
    setSelectedYear(e.target.value);
  };

  return (
    <Container className="d-flex flex-column py-3">
      <Row className="">
        <h1>Expenses Tracking</h1>
      </Row>
      <Row className="my-2">
        <Col md={2}>
          {" "}
          <ExpensesForm />
        </Col>
        <Col>
          {" "}
          <Form.Select
            id="month-select"
            value={selectedMonth}
            onChange={handleMonthChange}
            aria-label="Default select example"
          >
            {monthsList.map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col>
          {" "}
          <Form.Select
            id="year-select"
            value={selectedYear}
            onChange={handleYearChange}
            aria-label="Default select example"
          >
            {yearsList.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
      <Row>
        <Col>
          <ExpensesTable
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default MainScreen;

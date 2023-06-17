import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { BudgetsTable } from "../components";
import { monthsName } from "../assets/constants";

function MonthlyBudgetScreen() {
  const currentMonthIndex = new Date().getMonth();
  const currentMonth = monthsName[currentMonthIndex].name;

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
      <Row>
        <h2>Define your budget</h2>
      </Row>
      <Row className="my-2">
        <Col md={2}>
          {" "}
          <Button>Add New</Button>
        </Col>
        <Col>
          {" "}
          <Form.Select
            id="month-select"
            value={selectedMonth}
            onChange={handleMonthChange}
            aria-label="Default select example"
          >
            {monthsName.map((month) => (
              <option key={month.id} value={month.name}>
                {month.name}
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
          <BudgetsTable
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default MonthlyBudgetScreen;

import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { BarGraph } from "../components";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { getBudgetByYear } from "../features/budget/budgetSlice";
import { getExpensesByYear } from "../features/expense/expenseSlice";
import { getIncomesByYear } from "../features/income/incomeSlice";

function DashboardScreen() {
  const dispatch = useAppDispatch();
  const { budgets, isLoading, isSuccess, isError, message } = useAppSelector(
    (state) => state.budget.allBudgets
  );

  const {
    expenses,
    isLoading: exLoading,
    isSuccess: exSuccess,
    isError: exError,
    message: exMessage,
  } = useAppSelector((state) => state.expense.allExpenses);

  const {
    incomes,
    isLoading: inLoading,
    isSuccess: inSuccess,
    isError: inError,
    message: inMessage,
  } = useAppSelector((state) => state.income.allIncomes);

  const user = localStorage.getItem("user");
  const { id: userId } = JSON.parse(user || "{}");

  const currentYear = new Date().getFullYear();
  const yearsList: number[] = [
    currentYear,
    currentYear - 1,
    currentYear - 2,
    currentYear - 3,
  ];

  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  console.log("incomes", incomes);

  useEffect(() => {
    dispatch(getBudgetByYear({ userId, year: selectedYear }));
    dispatch(getExpensesByYear({ userId, year: selectedYear }));
    dispatch(getIncomesByYear({ userId, year: selectedYear }));
  }, [dispatch, userId, isSuccess, selectedYear, exSuccess, inSuccess]);

  const handleYearChange = (e: any) => {
    e.preventDefault();
    setSelectedYear(e.target.value);
  };

  return (
    <Container>
      <Row>
        <Col xs={2}>
          <Form.Label>
            <strong>Year:</strong>{" "}
          </Form.Label>
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
      <section className="text-center my-5">
        <h2>Budgets</h2>
        <BarGraph data={budgets} />
      </section>
      <section className="text-center my-5">
        <h2>Incomes</h2>
        <BarGraph data={incomes} />
      </section>
      <section className="text-center my-5">
        <h2>Expenses</h2>
        <BarGraph data={expenses} />
      </section>
    </Container>
  );
}

export default DashboardScreen;

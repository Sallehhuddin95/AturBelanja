import React, { useEffect } from "react";
import { Container, Row, Table } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../app/hook";
import { getAllBudgets } from "../features/budget/budgetSlice";
import { monthsName } from "../assets/constants";

function BudgetHistoryScreen() {
  const dispatch = useAppDispatch();
  const { budgets, isLoading, isSuccess, isError, message } = useAppSelector(
    (state) => state.budget.allBudgets
  );

  const { id: userId } = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    dispatch(getAllBudgets({ userId }));
  }, [dispatch, userId, isSuccess]);

  const getMonthName = (month: number) => {
    const monthObj = monthsName.find((m) => m.id === month);
    return monthObj ? monthObj.name : "";
  };

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
            {budgets.map((budget) => (
              <tr key={budget.id}>
                <td>
                  {getMonthName(budget.month)} {budget.year}
                </td>
                <td>{budget.total_value}</td>
                <td>{budget.created_at.slice(0, 10)}</td>
                <td>{budget.updated_at.slice(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}

export default BudgetHistoryScreen;

import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { BarGraph } from "../components";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { getBudgetByYear } from "../features/budget/budgetSlice";
import { getExpensesByYear } from "../features/expense/expenseSlice";

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

  const user = localStorage.getItem("user");
  const { id: userId } = JSON.parse(user || "{}");

  // console.log("expenses", expenses);

  useEffect(() => {
    dispatch(getBudgetByYear({ userId, year: 2023 }));
    dispatch(getExpensesByYear({ userId, year: 2023 }));
  }, [dispatch, userId]);
  return (
    <Container>
      <section className="text-center">
        <h2>Budgets</h2>
        <BarGraph data={budgets} />
      </section>
      <section className="text-center">
        <h2>Expenses</h2>
        <BarGraph data={expenses} />
      </section>
    </Container>
  );
}

export default DashboardScreen;

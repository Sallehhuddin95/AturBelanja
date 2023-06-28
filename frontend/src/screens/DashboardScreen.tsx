import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { BarGraph } from "../components";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { getBudgetByYear } from "../features/budget/budgetSlice";

function DashboardScreen() {
  const dispatch = useAppDispatch();
  const { budgets, isLoading, isSuccess, isError, message } = useAppSelector(
    (state) => state.budget.allBudgets
  );

  const user = localStorage.getItem("user");
  const { id: userId } = JSON.parse(user || "{}");

  console.log("budgets", budgets);

  useEffect(() => {
    dispatch(getBudgetByYear({ userId, year: 2023 }));
  }, [dispatch, userId]);
  return (
    <Container>
      <section className="text-center">
        <h2>Budgets</h2>
        <BarGraph data={budgets} />
      </section>
    </Container>
  );
}

export default DashboardScreen;

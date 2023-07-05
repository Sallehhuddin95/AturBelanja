import React from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import { MonthlyBudgetScreen, BudgetHistoryScreen } from ".";

function BudgetScreen() {
  return (
    <Container>
      <Tabs
        defaultActiveKey="monthly-budget"
        id="budgeting-tabs"
        className="mb-3"
      >
        <Tab eventKey="monthly-budget" title="Budget">
          <MonthlyBudgetScreen />
        </Tab>
        <Tab eventKey="history-budget" title="History">
          <BudgetHistoryScreen />
        </Tab>
      </Tabs>
    </Container>
  );
}

export default BudgetScreen;

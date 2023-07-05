import React from "react";
import { Tab, Tabs, Container } from "react-bootstrap";
import { ExpenseRecordsScreen, IncomeRecordsScreen } from ".";

function RecordsScreen() {
  return (
    <Container>
      <Tabs defaultActiveKey="expense" id="records-tabs" className="mb-3">
        <Tab eventKey="expense" title="Expense">
          <ExpenseRecordsScreen />
        </Tab>
        <Tab eventKey="income" title="Income">
          <IncomeRecordsScreen />
        </Tab>
      </Tabs>
    </Container>
  );
}

export default RecordsScreen;

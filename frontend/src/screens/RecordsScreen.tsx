import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { ExpenseRecordsScreen, IncomeRecordsScreen } from ".";

function RecordsScreen() {
  return (
    <div>
      <Tabs defaultActiveKey="expense" id="records-tabs" className="mb-3">
        <Tab eventKey="expense" title="Expense">
          <ExpenseRecordsScreen />
        </Tab>
        <Tab eventKey="income" title="Income">
          <IncomeRecordsScreen />
        </Tab>
      </Tabs>
    </div>
  );
}

export default RecordsScreen;

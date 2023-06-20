import React, { useEffect, useState, useRef } from "react";
import { Table, Row, Col, Button } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Loader, Message, ConfirmationDialog } from "../components";
import { useAppSelector, useAppDispatch } from "../app/hook";
import { getMonthlyBudgets } from "../features/budget/budgetSlice";
import { monthsName } from "../assets/constants";
import { BudgetsForm } from ".";

function BudgetsTable(props: any) {
  const dispatch = useAppDispatch();
  const { selectedMonth, selectedYear } = props;
  const user = localStorage.getItem("user");
  const { id: userId } = JSON.parse(user || "{}");
  const monthNumber = monthsName.find((m) => m.name === selectedMonth)?.id;
  const { budgets, isLoading, isSuccess, isError, message } = useAppSelector(
    (state) => state.budget.monthlyBudgets
  );

  const [openBudgetForm, setOpenBudgetForm] = useState<boolean>(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] =
    useState<boolean>(false);
  const [selectedBudgetId, setSelectedBudgetId] = useState<string>("");

  useEffect(() => {
    dispatch(
      getMonthlyBudgets({ month: monthNumber, year: selectedYear, userId })
    );
    setOpenBudgetForm(false);
  }, [dispatch, selectedMonth, selectedYear, monthNumber, userId, isSuccess]);

  const handleEdit = (id: string) => {
    setSelectedBudgetId(id);
    setOpenBudgetForm(true);
  };

  const handleDelete = (id: string) => {
    setSelectedBudgetId(id);
    setOpenConfirmationDialog(true);
  };

  return (
    <>
      {isLoading && <Loader />}
      {isError && message && <Message variant="danger">{message}</Message>}
      <Row className="my-3">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>No.</th>
              <th>Category</th>
              <th>Allocation (RM)</th>
              <th>Note</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {budgets.map((budget: any, index: any) => (
              <tr key={budget.id}>
                <td>{index + 1}</td>
                <td>{budget.category}</td>
                <td>{budget.budget}</td>
                <td>{budget.note}</td>
                <td className="d-flex justify-content-center">
                  <Button
                    className="me-2"
                    onClick={() => handleEdit(budget.id)}
                  >
                    <FaEdit />
                  </Button>

                  <Button onClick={() => handleDelete(budget.id)}>
                    <FaTrashAlt />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
      {openBudgetForm && (
        <BudgetsForm
          action="edit"
          show={openBudgetForm}
          allocation={budgets.find((b) => b.id === selectedBudgetId)}
          onHide={() => setOpenBudgetForm(false)}
        />
      )}
      {openConfirmationDialog && (
        <ConfirmationDialog
          show={openConfirmationDialog}
          onHide={() => setOpenConfirmationDialog(false)}
          id={selectedBudgetId}
          itemType="budget"
          action="delete"
        />
      )}
    </>
  );
}

export default BudgetsTable;
